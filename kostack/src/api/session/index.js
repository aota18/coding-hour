const Router = require('koa-router');
const session = new Router();
const sessionCtrl = require('./session.controller');

session.post('/', sessionCtrl.register);
session.get('/:sessionId', sessionCtrl.findBySessionId);

// will join
session.put('/:sessionId/willJoin', sessionCtrl.toggleWillJoin);
session.get('/:sessionId/willJoin/:userId', sessionCtrl.checkWillJoin);
session.get('/:sessionId/willJoin', sessionCtrl.numberOfWillJoin);

// attendance
session.post('/:sessionId/attend', sessionCtrl.addAttendUsers);
session.get('/:sessionId/attend', sessionCtrl.getAttendUsers);

module.exports = session;