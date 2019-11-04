const express = require('express');
const register = require('./register');
const signin = require('./signin');
const negotiations = require('./negotiations');

const router = express.Router();

router.use('/negotiations', negotiations);
router.use('/signin', signin);
router.use('/register', register);

module.exports = router;
