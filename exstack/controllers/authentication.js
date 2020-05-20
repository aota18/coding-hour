var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');



module.exports.register= function(req, res, next){

  console.log(req);

    var user = new User();

    
      user.email = req.body.email,
      user.username =  req.body.username,
      user.password =  user.setPassword(req.body.password),
      user.creation_dt =  Date.now();

      user.save(function(err){
            // var token;
            // token = user.generateJwt();
            res.status(200);
            res.json({
                "success": true
            });
        });

}


module.exports.login = function(req, res, next){


    passport.authenticate('local', function(err, user, info) {

        var token;

        if (err) {
            return res.status(404).json(err); 
        }

        if (!user) {
             return res.status(501).json(info); 
        }
        token = user.generateJwt();
        req.logIn(user, function(err) {
          if (err) { 
              return res.status(501).json(err); 
        }
          return res.status(200).json({
            "success": true,
            "token": token
          });
        });
      })(req, res, next);
    
};
