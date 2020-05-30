const Router = require('koa-router');
const account = new Router();
const accountCtrl = require('./account.controller');

account.get('/:userId/classes', accountCtrl.getClass);
account.get('/:userId', accountCtrl.getUser)

module.exports = account;