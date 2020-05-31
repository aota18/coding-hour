const mongoose = require('mongoose');
const { Schema } = mongoose ;

const Comment = new Schema({
    text: String,
    user: { type: Schema.Types.ObjectId, ref: 'Account' },  // id of account
    post: { type: Schema.Types.ObjectId, ref: 'Post' },     // id of post
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

Comment.statics.register = function({text, userId, postId}){
    const comment = new this({
        user: userId, 
        post: postId,
        text: text
    });

    return comment.save();
}

Comment.statics.findByCommentId = function(commentId){
    return this.findOne({
        _id: commentId,
        deleted: false
    }).exec();
}

Comment.statics.findByPostId = function(postId){
    return this.find({
        post: postId,
        deleted: false
    })
    .populate('user')
    .exec();
}

module.exports = mongoose.model('Comment', Comment);