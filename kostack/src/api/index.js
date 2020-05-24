const Router = require('koa-router');

const api = new Router();
const auth = require('./auth');
const clazz = require('./class');

api.use('/auth', auth.routes());
api.use('/class', clazz.routes());

module.exports = api;