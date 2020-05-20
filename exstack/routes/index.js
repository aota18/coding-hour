var express = require('express');
var router = express.Router();

var ctrlAuth = require('../controllers/authentication');
var ctrlUser = require('../controllers/user');

  // Authentication
  router.post('/auth/register', ctrlAuth.register);
  router.post('/auth/login', ctrlAuth.login);
  // router.post('/newPost', ctrlPost.newPost);


  // User
  router.get('/user/profile/:id', ctrlUser.profile);

module.exports = router;
