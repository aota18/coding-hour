var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');


module.exports.profile = (req, res, next) => {
    
    if(!req.params.id){
        res.json({ success: false, message: 'No User id was provided.'})
    }else {
        User.findOne({ _id: req.params.id}, (err, user) => {
            if(err) {
                res.json({success: false, message: 'Not a valid User id.'})
            } else {
                if(!user) {
                    res.json({success: false, message: 'User not found'});
                } else {
                     res.json({success: true, user: user});
                }
            }
        })
    }
}