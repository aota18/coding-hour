const Router = require('koa-router');
const clazz = new Router();
const classCtrl = require('./class.controller');

clazz.post('/register', classCtrl.register);
clazz.post('/join', classCtrl.join);
clazz.get('/year/:year/semester/:semester', classCtrl.findByYearAndSemester);
clazz.get('/name/:name', classCtrl.findByClassName);

module.exports = clazz;