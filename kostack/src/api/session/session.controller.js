const Session = require('models/Session');
const Account = require('models/Account');
const Class = require('models/Class');


exports.register = async (ctx) => {
    
    const classId = ctx.request.body.classId;
    const userId = ctx.request.body.userId;

    const clazz = await Class.findByClassId(classId);

    if(clazz == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Class Undefined"
        }
        return;
    }

    const user = await Account.findByUserId(userId);
    if(user == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Account Undefined"
        }
        return;
    }

    const role = user.classes.find(e => {
        return e.role.auth == 'Admin' && e.classId == classId
    });
    if(role == undefined){
        ctx.status = 401;
        ctx.body = {
            Success: false,
            data: {},
            message: "Account Unauthorized"
        }
        return;
    }

    await Session.register(ctx.request.body);

    ctx.body = {
        Success: true,
        data: {}
    }
}

exports.findBySessionId = async (ctx) => {
    const { sessionId } = ctx.params;


    const session = await Session.findBySessionIdWithAttended(sessionId);
    if(session == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Session Undefined"
        }
        return;
    }

    console.log(session);

    const attended = [];
    session.attended.forEach(e =>{
        attended.push({
            userId: e._id,
            username: e.profile.username
        });
    });

    ctx.body = {
        Success: true,
        data: {
            sessionId: session._id,
            date: session.date,
            attended: attended
        }
    }
}

// will join
exports.toggleWillJoin = async (ctx) => {
    const { sessionId, userId } = ctx.params;

    const user = await Account.findByUserId(userId);
    if(user == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Account Undefined"
        }
        return;
    }

    const session = await Session.findBySessionId(sessionId);
    if(session == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Session Undefined"
        }
        return;
    }

    await session.toggleWillJoin(userId);
    
    ctx.body = {
        Success: true,
        data: {},
    }
}

exports.checkWillJoin = async (ctx) => {
    const { sessionId, userId } = ctx.params;

    const user = await Account.findByUserId(userId);
    if(user == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Account Undefined"
        }
        return;
    }

    const session = await Session.findBySessionId(sessionId);
    if(session == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Session Undefined"
        }
        return;
    }

    const idx = session.willJoin.findIndex(e => e==userId);
    if(idx == -1){
        ctx.body = {
            Success: true,
            data: {
                willJoin: false
            }
        }
    }else{
        ctx.body = {
            Success: true,
            data: {
                willJoin: true
            }
        }
    }
}

exports.numberOfWillJoin = async (ctx) => {
    const { sessionId } = ctx.params;

    const session = await Session.findBySessionId(sessionId);
    if(session == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Session Undefined"
        }
        return;
    }

    ctx.body = {
        Success: true,
        data: {
            number: session.willJoin.length
        }
    }
}

// attendance
exports.addAttendUsers = async (ctx) => {
    const userList = JSON.parse(ctx.request.body.attended);
    const { sessionId } = ctx.params;

    const session = await Session.findBySessionId(sessionId);
    if(session == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Session Undefined"
        }
        return;
    }

    await session.addAttendUsers(userList);
    ctx.body = {
        Success: true,
        data: {}
    }
}
