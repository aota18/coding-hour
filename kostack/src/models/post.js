const mongoose = require('mongoose');
const { Schema } = mongoose ;
const Account = require('./Account');

const Post = new Schema({
    user: Account,
    title: String,
    text: String
});

Post.statics.writePost(function(user, title, text){
    const post = new this(user, title, text);

    return post.save();
});

module.exports = mongoose.model('Post', Post);