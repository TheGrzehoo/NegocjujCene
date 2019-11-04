const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = {
  saltRounds: 10,
  generateToken: (data) => {
    const token = jwt.sign(data, config.get('jwtPrivateKey'));
    return token;
  },
  hashPass: (pass) => bcrypt.hash(pass, this.saltRounds),
  comparePass: (pass, accHash) => bcrypt.compareSync(pass, accHash),
};

module.exports = User;
