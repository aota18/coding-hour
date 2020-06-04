const Post = require('../../models/post.js');
const Account = require('../../models/account.js');
const Comment = require('../../models/comment.js');

exports.writeComment = async (ctx) => {
    const post = await Post.findByPostId(ctx.request.body.postId);
    if(post == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            message: "Post Undefined"
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

    const comment = await Comment.register(ctx.request.body);

    await post.addComment(comment._id);
    await account.addComment(comment._id);

    ctx.body = {
        Success: true,
        data: {}
    };
};

exports.findByCommentId = async (ctx) => {
    const { commentId } = ctx.params;

    const comment = await comment.findByCommentId(commentId);

    ctx.body = {
        Success: true,
        data: {
            comment: comment
        }
    }
};