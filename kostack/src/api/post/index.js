const Router = require('koa-router');
const post = new Router();
const postCtrl = require('./post.controller');

post.post('/', postCtrl.writePost);
post.get('/:postId', postCtrl.findByPostId);

module.exports = post;