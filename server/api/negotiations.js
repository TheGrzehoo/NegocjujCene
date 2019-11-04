const negotiation = require('express').Router();
const mssql = require('mssql');
const auth = require('../middleware/auth');
const config = require('../database/connection');

negotiation.get('/get_offers', auth, (req, res) => {
  res.send({
    error: true,
    errorMessage: 'nie znaleziono użytkownika',
  });
});

negotiation.post('/place_offer', (req, res) => {
  console.log(req);
  const jsonObj = JSON.stringify(req.body.offer_data);
  console.log(jsonObj);
  mssql.connect(config).then((pool) => pool.request()
    .input('json_negotiation', mssql.VarChar(mssql.MAX), jsonObj)
    .output('negotiation_id', mssql.Int, 0)
    .output('negotiation_track_id', mssql.VARCHAR(36))
    .execute('nc_sp_negotiations_ins', (err, result) => {
      const data = {
        data: result,
        erroe: err,
      };
      console.log(data);
      res.send(data);
      mssql.close();
    }))
    .then((obj) => {
      console.log(obj);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
      mssql.close();
    });
});

module.exports = negotiation;
