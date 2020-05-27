const Router = require('koa-router');
const account = new Router();
const accountCtrl = require('./account.controller');

account.get('/:user/classes', accountCtrl.getClass);
account.get('/:user', accountCtrl.getUser)

module.exports = account;