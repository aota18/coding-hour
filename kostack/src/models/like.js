const mongoose = require('mongoose');
const { Schema } = mongoose ;

const Like = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Account' },  // id of account
    post: { type: Schema.Types.ObjectId, ref: 'Post' }  // id of post
});

module.exports = mongoose.model('Like', Like);