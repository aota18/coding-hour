const Router = require('koa-router');
const auth = new Router();
const classCtrl = require('./class.controller');

auth.post('/register', classCtrl.register);
auth.post('/join', classCtrl.join);

module.exports = auth;