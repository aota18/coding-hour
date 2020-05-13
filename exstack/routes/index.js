var express = require('express');
var router = express.Router();

var ctrlAuth = require('../controllers/authentication');


  // Authentication
  router.post('/register', ctrlAuth.register);
  router.post('/login', ctrlAuth.login);
  // router.post('/newPost', ctrlPost.newPost);

module.exports = router;
