const Router = require('koa-router');
const session = new Router();
const sessionCtrl = require('./session.controller');

session.post('/', sessionCtrl.register);
session.get('/:sessionId', sessionCtrl.findBySessionId);

// will join
session.put('/:sessionId/willjoin/:userId', sessionCtrl.toggleWillJoin);
session.get('/:sessionId/willjoin/:userId', sessionCtrl.checkWillJoin);
session.get('/:sessionId/willjoin', sessionCtrl.numberOfWillJoin);

// attendance
session.post('/:sessionId/attend', sessionCtrl.addAttendUsers);

module.exports = session;