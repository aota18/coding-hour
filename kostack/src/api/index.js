const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const clazz = require('./class');
const account = require('./account');
const post = require('./post');
const comment = require('./comment');

api.use('/auth', auth.routes())
    .use('/class', clazz.routes())
    .use('/account', account.routes())
    .use('/post', post.routes())
    .use('/comment', comment.routes());

module.exports = api;