const Post = require('models/Post');
const Account = require('models/Account');
const Class = require('models/Class');
const Comment = require('models/Comment');

exports.writePost = async (ctx) => {
    const clazz = await Class.findByClassId(ctx.request.body.classId);
    if(clazz == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            message: "Class Undefined"
        }
        return;
    }

    const account = await Account.findByUserId(ctx.request.body.userId);
    if(account == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            message: "Account Undefined"
        }
        return;
    }

    const post = await Post.writePost(ctx.request.body);

    await account.addPost(post._id);
    await clazz.addPost(post._id);

    ctx.body = {
        Success: true,
        data: {}
    };
};

exports.findByPostId = async (ctx) => {
    const { postId } = ctx.params;

    const post = await Post.findByPostId(postId);
    // console.log(post)
    const comments = await Comment.findByPostId(postId);
    // console.log(comments);
    const commentDto = [];

    for(let i=0;i<comments.length;i++){
        commentDto.push({
            userId: comments[i].user._id,
            username: comments[i].user.profile.username,
            email: comments[i].user.email,
            text: comments[i].text,
            createdAt: comments[i].createdAt,
        })
    }

    const ret = {
        classId: post.class,
        writer: post.user.profile.username,
        createdAt: post.createdAt,
        title: post.title,
        type: post.type,
        body: post.body,
        comments : commentDto
    }

    ctx.body = {
        Success: true,
        data: ret
    }
};