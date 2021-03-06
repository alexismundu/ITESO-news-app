const express = require('express');
const { find } = require('../src/models/user');
const { UserController } = require('./../src/controllers');

const router = express.Router();

router.get('/', UserController.findAll);

module.exports = router;