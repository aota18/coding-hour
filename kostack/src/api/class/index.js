const Router = require('koa-router');
const clazz = new Router();
const classCtrl = require('./class.controller');

clazz.get('/:classId', classCtrl.findByClassId);
clazz.post('/register', classCtrl.register);
clazz.post('/join', classCtrl.join);
clazz.get('/year/:year/semester/:semester', classCtrl.findByYearAndSemester);
clazz.get('/name/:name', classCtrl.findByClassName);
clazz.put('/:classId', classCtrl.edit);
clazz.delete('/:classId', classCtrl.delete);
clazz.put('/:classId/participants/:targetId', classCtrl.changeRole);
clazz.get('/:classId/participants', classCtrl.getParticipants);
clazz.get('/:classId/post', classCtrl.findPost);

module.exports = clazz;