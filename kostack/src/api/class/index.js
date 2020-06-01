const Router = require('koa-router');
const clazz = new Router();
const classCtrl = require('./class.controller');

clazz.get('/:classId', classCtrl.findByClassId);
clazz.get('/year/:year/semester/:semester', classCtrl.findByYearAndSemester);
clazz.get('/name/:name', classCtrl.findByClassName);
clazz.post('/register', classCtrl.register);
clazz.put('/:classId', classCtrl.edit);
clazz.delete('/:classId', classCtrl.delete);

// account
clazz.post('/join', classCtrl.join);
clazz.put('/:classId/participants/:targetId', classCtrl.changeRole);
clazz.get('/:classId/participants', classCtrl.getParticipants);

// post
clazz.get('/:classId/post', classCtrl.findPost);

// session
clazz.get('/:classId/sessions', classCtrl.getSessions);

module.exports = clazz;