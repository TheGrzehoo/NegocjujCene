const register = require('express').Router();
const mssql = require('mssql');
const config = require('../database/connection');
const User = require('../modules/User');

register.post('/', (req, res) => {
  const hashPass = User.hashPass(req.body.password);
  hashPass.then((password) => {
    mssql.connect(config).then((pool) => pool.request()
      .input('user_firstname', mssql.VarChar(50), req.body.firstName)
      .input('user_lastname', mssql.VarChar(50), req.body.lastName)
      .input('user_email', mssql.VarChar(200), req.body.email)
      .input('user_pass', mssql.VarChar(50), password)
      .output('user_status', mssql.Int, 0)
      .output('user_id', mssql.Int)
      .output('user_track_id', mssql.VarChar(36))
      .output('verification_code', mssql.VarChar(36))
      .execute('nc_sp_users_ins', (err, result) => {
        if (err) {
          console.log(err);
          res.send('Błąd bazy danych');
        }

        console.log(result);

        const token = User.generateToken({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        });
        res.setHeader('x-auth-token', token);
        res.send(token);
        mssql.close();
      }))
      .catch((err) => {
        console.log(err);
      });
  }).catch((error) => {
    console.log(error);
    res.send('Błąd serwera. Spróbuj ponownie później');
  });
});

module.exports = register;
