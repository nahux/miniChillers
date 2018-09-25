var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config/config.json');
var auth = jwt({
  secret: config.secret,
  userProperty: 'payload'
});

var ctrlAdmin = require('../controllers/admin');
var ctrlAuth = require('../controllers/authentication');

router.get('/admin', auth, ctrlAdmin.profileRead);

module.exports = router;