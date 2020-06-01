const Router = require('koa-router');
const comment = new Router();
const commentCtrl = require('./comment.controller');

comment.post('/', commentCtrl.writeComment);
comment.get('/:commentId', commentCtrl.findByCommentId);

module.exports = comment;