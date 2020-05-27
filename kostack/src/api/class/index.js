const Router = require('koa-router');
const clazz = new Router();
const classCtrl = require('./class.controller');

clazz.post('/register', classCtrl.register);
clazz.post('/join', classCtrl.join);

module.exports = clazz;