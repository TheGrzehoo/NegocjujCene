const config = require('config');
const express = require('express');
const cors = require('cors');

const app = express();
const api = require('./api/api');

if (!config.get('jwtPrivateKey')) {
  console.log('No JSON web token provided. Provide environment variable.');
  process.exit(1);
}

app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());
app.use('/api', api);

app.get('/getUserData', (req, res) => {
  res.sendFile(`${__dirname}/getUserData/getUserData.html`);
});

app.get('/getWidget', (req, res) => {
  res.sendFile(`${__dirname}/getUserData/getWidget.js`);
});

app.get('/sent_product', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {});
