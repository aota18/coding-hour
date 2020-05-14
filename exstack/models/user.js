var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var jwt = require('jsonwebtoken');

var schema = new Schema({
    email: {
        type:String,
        unique: true, 
        require: true
    },
    username: {
        type:String, 
        require: true
    },
    hash: String,
    salt: String,
    creation_dt: Date
});

schema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

schema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash == hash;
}

schema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

  module.exports = mongoose.model('User', schema);