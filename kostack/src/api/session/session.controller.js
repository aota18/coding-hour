const Session = require('models/Session');
const Account = require('models/Account');
const Class = require('models/Class');


exports.register = async (ctx) => {
    console.log(ctx.request.body);
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

    // get attended participants
    const attended = [];
    session.attended.forEach(e =>{
        attended.push({
            userId: e._id.toString(),
            username: e.profile.username
        });
    });
    attended.sort(function(a,b){
        if(a.userId < b.userId)
            return -1;
        else if(a.userId == b.userId)
            return 0;
        else
            return 1;
    });

    // get all participants
    const clazz = await Class.getParticipants(session.class);
    const participants = [];
    clazz.participants.forEach(e => {
        participants.push({
            userId: e._id.toString(),
            username: e.profile.username,
            thumbnail: e.profile.thumbnail,
            isAttended: false
        });
    });
    participants.sort(function(a,b){
        if(a.userId < b.userId)
            return -1;
        else if(a.userId == b.userId)
            return 0;
        else
            return 1;
    });

    for(let i=0, j=0;i<attended.length && j<participants.length; j++){
        if(attended[i].userId == participants[j].userId){
            participants[j].isAttended = true;
            i++;
        }else if(attended[i].userId < participants[j].userId){
            i++;
            j--;
        }
    }

    ctx.body = {
        Success: true,
        data: {
            sessionId: session._id,
            date: session.date,
            participants: participants
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
