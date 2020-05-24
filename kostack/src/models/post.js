const mongoose = require('mongoose');
const { Schema } = mongoose ;

const Post = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Account' },             // user object Id
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],          // list of file ids
    title: String,
    text: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],          // list of like ids
    class: { type: Schema.Types.ObjectId, ref: 'Class' },           // id of class
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],    // list of comments ids
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

Post.statics.writePost(function(user, title, text){
    const post = new this(user, title, text);

    return post.save();
});

module.exports = mongoose.model('Post', Post);