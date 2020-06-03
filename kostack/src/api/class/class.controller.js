const Account = require('models/Account');
const Class = require('models/Class');
const Post = require('models/Post');
const Session = require('models/Session');

// exception: user undefined
exports.register = async (ctx) => {
    
    const clazz = await Class.register(ctx.request.body);

    const joinClassInfo = {
        classId: clazz._id,
        auth: "Admin",
        rolename: ctx.request.body.role
    };

    const user = await Account.findByUserId(ctx.request.body.userId);

    if(user == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "User Undefined"
        }
        return;
    }

    await user.joinClass(joinClassInfo);

    ctx.body = {
        Success: true,
        data: {}
    }
};

// exception: user undefined
exports.join = async (ctx) => {
    const joinClassInfo = {
        userId: ctx.request.body.userId,
        classId: ctx.request.body.classId,
        auth: "Participant",
        rolename: "Student"
    };

    const user = await Account.findByUserId(ctx.request.body.userId);

    if(user == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "User Undefined"
        }
        return;
    }

    try{
        await user.joinClass(joinClassInfo);
    }catch(e){
        if(e == 409){
            ctx.status = 409;
            ctx.body = {
                Success: false,
                data: {},
                message: "User is already in the Class"
            }
            return;
        }
    }
    

    const clazz = await Class.findByClassId(ctx.request.body.classId);

    if(clazz == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Class Undefin ed"
        }
        return;
    }
    
    try{
        await clazz.joinUser(joinClassInfo);
    }catch(e){
        if(e == 409){
            ctx.status = 409;
            ctx.body = {
                Success: false,
                data: {},
                message: "User is already in the Class"
            }
            return;
        }
    }

    ctx.body = {
        Success: true,
        data: {}
    }
}

exports.findByClassId = async (ctx) => {
    const {classId} = ctx.params;

    const clazz = await Class.findByClassId(classId);

    ctx.body = {
        Success: true,
        data: {
            clazz: clazz
        }
    }
}

exports.findByYearAndSemester = async (ctx) => {
    const { semester, year } = ctx.params;

    const yearAndSemester = {
        semester: semester,
        year: year
    };

    const classes = await Class.findByYearAndSemester(yearAndSemester);

    ctx.body = {
        Success: true,
        data: {
            classes: classes
        }
    }
}

exports.findByClassName = async (ctx) => {
    
    const { name } = ctx.params;

    const classes = await Class.findByClassName(name);

    console.log(classes)
    ctx.body = {
        Success: true,
        data: {
            classes: classes
        }
    }
}

exports.edit = async (ctx) => {
    const { classId } = ctx.params;

    const clazz = await Class.findByClassId(classId);

    if(clazz == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            message: "Class Undefined"
        }
        return;
    }

    const editedClass = {
        name: ctx.request.body.name == undefined ? clazz.name : ctx.request.body.name,
        year: ctx.request.body.year == undefined ? clazz.year : ctx.request.body.year,
        semester: ctx.request.body.semester == undefined ? clazz.semester : ctx.request.body.semester,
    };

    await clazz.edit(editedClass);

    ctx.body = {
        Success: true,
        data: {}
    }
}

exports.delete = async (ctx) => {
    const { classId } = ctx.params;

    const clazz = await Class.findByClassId(classId);

    if(clazz == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            message: "Class Undefined"
        }
        return;
    }

    await clazz.delete();

    ctx.body = {
        Success: true,
        data: {}
    }
}

exports.changeRole = async (ctx) => {
    const {classId, targetId} = ctx.params;
    const userId = ctx.request.body.userId;
    const auth = ctx.request.body.auth;
    const rolename = ctx.request.body.rolename;

    const user = await Account.findByUserId(userId);
    if(user == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "User Undefined"
        }
        return;
    }

    let idx = user.classes.findIndex((e) => e.classId == classId);
    if(idx == -1){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Admin is not member of Class"
        }
        return;
    }

    if(user.classes[idx].role.auth != 'Admin'){
        ctx.status = 401;
        ctx.body = {
            Success: false,
            data: {},
            message: "Role UnAuthorized"
        }
        return;
    }

    const target = await Account.findByUserId(targetId);
    idx = target.classes.findIndex((e) => e.classId == classId);
    if(idx == -1){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Target is not member of Class"
        }
        return;
    }

    await target.changeRole({classId, auth, rolename});
    ctx.body = {
        Success: true,
        data: {}
    }
}

exports.findPost = async (ctx) => {
    const { classId } = ctx.params;

    const clazz = await Class.findByClassId(classId);
    if(clazz == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            message: "Class Undefined"
        }
        return;
    }

    const posts = await Post.findByClassId(classId);
    const postsDto = [];

    for(let i=0;i<posts.length;i++){
        const rolename = posts[i].user.classes.find(e => {return e.classId == classId}).role.name;

        postsDto.push({
            postId: posts[i]._id,
            type: posts[i].type,
            title: posts[i].title,
            body: posts[i].body,
            writer: posts[i].user.profile.username,
            createdAt: posts[i].createdAt,
            commentCount: posts[i].comments.length,
            role: rolename,
        });
    }

    ctx.body = {
        Success: true,
        data: {
            posts: postsDto
        }
    }
}

exports.getParticipants = async (ctx) => {
    const { classId } = ctx.params;
    const clazz = await Class.getParticipants(classId);

    if(clazz == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            message: "Class Undefined"
        }
        return;
    }

    const part = [];
    for(let i=0;i<clazz.participants.length;i++){
        part.push({
            userId: clazz.participants[i]._id,
            username: clazz.participants[i].profile.username,
            email: clazz.participants[i].email
        });
    }

    ctx.body = {
        Success: true,
        data: {
            participants: part
        }
    };
}

exports.getSessions = async (ctx) => {
    console.log(ctx.params);
    const { classId } = ctx.params;
    const clazz = await Class.getParticipants(classId);

    if(clazz == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            message: "Class Undefined"
        }
        return;
    }

    const sessions = await Session.findByClassId(classId);
    const sessionsDto = [];
    sessions.forEach(s =>{
        sessionsDto.push({
            sessionId: s._id,
            willJoinNum: s.willJoin.length,
            attendedNum: s.attended.length,
            date: s.date
        });
    });

    ctx.body = {
        Success: true,
        data: {
            sessions: sessionsDto
        }
    }
}