const signin = require('express').Router();
const mssql = require('mssql');
const config = require('../database/connection');
const User = require('../modules/User');

signin.post('/', (req, res) => {
  mssql.connect(config).then((pool) => pool.request().query(`SELECT * FROM nc_t_users WHERE user_id = ${req.body.id}`))
    .then((result) => {
      const userData = result.recordset[0];
      const token = User.generateToken({
        id: userData.user_track_id,
        email: userData.user_email,
        status: userData.user_status,
      });
      res.setHeader('x-auth-token', token);
      res.send({
        login: userData.user_email,
      });
      mssql.close();
    }).catch((err) => {
      res.send(err);
      mssql.close();
    });
});

module.exports = signin;
