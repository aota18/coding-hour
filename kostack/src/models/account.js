const mongoose = require('mongoose');
const { Schema } = mongoose ;
const crypto = require('crypto');
const { generateToken } = require('lib/token');


// Function for Hashing Password
function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const Account = new Schema({
    profile: {
        username: String,
        thumbnail: { type: String, default: '/static/images/default_thumbnail.png' }
    },
    email: { type: String },
    social: {
        google: {
            id: String,
            accessToken: String
        }
    },

    password: String, 
    mobile: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],          // list of post ids
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],          // list of like ids
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],    // list of comments ids
    classes: [{ classId: { type: Schema.Types.ObjectId, ref: 'Class'}, role: { auth: String, name: String } }], // list of comments ids
    thoughtCount: { type: Number, default: 0 }, // Increase 1 When user post something
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

Account.statics.findByUserId = function(userId) {
    return this.findOne({
        _id: userId,
        deleted: false
    }).exec();
}

Account.statics.findByUsername = function(username) {
    return this.findOne({'profile.username' : username, deleted: false}).exec();
}

Account.statics.findByEmail = function(email) {
    return this.findOne({email, deleted: false}).exec();
}

Account.statics.findByEmailOrUsername = function({username, email}){
    return this.findOne({
        $and: [
            {
                $or: [
                    { 'profile.username': username},
                    { email }
                ]
            },
            { deleted: false }
        ]
    }).exec();
}

Account.statics.localRegister = function({username, email, password}) {
    const account = new this({
        profile: {
            username
        },
        email,
        password: hash(password)
    });

    return account.save();
}

Account.methods.validatePassword = function(password) {
    // Compare the hash of passwed password and data's hash.
    const hashed = hash(password);
    return this.password === hashed;
}

Account.methods.generateToken = function() {

    const payload = {
        _id: this._id,
        profile: this.profile,
        email: this.email
    };

    return generateToken(payload, 'account');
}

Account.methods.joinClass = function({classId, auth, rolename}){
    const clazz = {
        classId: classId,
        role: {
            auth: auth,
            name: rolename
        }
    };

    if(this.classes.find(e => { return e.classId == clazz.classId }) == undefined)
        this.classes.push(clazz);
    
    return this.save();
}

Account.methods.changeRole = function({classId, auth, rolename}){
    const role = {
        auth: auth,
        name: rolename
    }

    const classes = this.classes;
    for(let i=0;i<classes.length;i++){
        if(classes[i].classId == classId){
            classes[i].role = role;
        }
    }

    this.save();
}

Account.methods.toDto = function(){
    return {
        _id: this._id,
        profile: this.profile,
        email: this.email
    }
}

module.exports = mongoose.model('Account', Account);