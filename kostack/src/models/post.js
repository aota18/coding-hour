const mongoose = require('mongoose');
const { Schema } = mongoose ;

const Post = new Schema({
    title: String,
    type: String,
    body: String,
    user: { type: Schema.Types.ObjectId, ref: 'Account' },             // user object Id
    files: [{ type: Schema.Types.ObjectId, ref: 'File' }],          // list of file ids
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like' }],          // list of like ids
    class: { type: Schema.Types.ObjectId, ref: 'Class' },           // id of class
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],    // list of comments ids
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

Post.statics.writePost = function({userId, classId, title, type, body}){
    const post = new this({
            user: userId, 
            class: classId,
            title: title,
            type: type,
            body: body,
    });

    return post.save();
};

Post.statics.findByPostId = function(postId){
    return this.findOne({
        _id: postId,
        deleted: false
    })
    .populate('user')
    .exec();
}

Post.statics.findByClassId = function(classId){
    return this.find({
        class: classId,
        deleted: false
    })
    .populate('user')
    .exec();
}

Post.methods.addComment = function(commentId){
    const comment = this.comments.find(e => {return e == commentId});
    if(comment == undefined)
        this.comments.push(commentId);

    return this.save();
}

module.exports = mongoose.model('Post', Post);