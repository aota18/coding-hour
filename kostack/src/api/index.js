const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const clazz = require('./class');
const account = require('./account');

api.use('/auth', auth.routes())
    .use('/class', clazz.routes())
    .use('/account', account.routes());

module.exports = api;