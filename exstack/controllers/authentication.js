var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');



module.exports.register= function(req, res, next){

    var user = new User();

    
      user.email = req.body.email,
      user.username =  req.body.name,
      user.password =  user.setPassword(req.body.password),
      user.creation_dt =  Date.now();

      user.save(function(err){
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        });

}


module.exports.login = function(req, res, next){


    passport.authenticate('local', function(err, user, info) {

        console.log(user);
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
          return res.status(200).json({"token": token});
        });
      })(req, res, next);
    
};
