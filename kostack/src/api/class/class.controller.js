const Account = require('models/Account');
const Class = require('models/Class');

// exception: user undefined
exports.register = async (ctx) => {
    
    const clazz = await Class.register(ctx.request.body);

    const joinClassInfo = {
        classId: clazz._id,
        auth: "Admin",
        rolename: ctx.request.body.role
    };

    const user = await Account.findByUserId(ctx.request.body._id);

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
        userId: ctx.request.body._id,
        classId: ctx.request.body.classId,
        auth: "Participant",
        rolename: "Student"
    };

    const user = await Account.findByUserId(ctx.request.body._id);

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
    

    const clazz = await Class.findByClassId(ctx.request.body.classId);

    if(clazz == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "Class Undefined"
        }
        return;
    }
    
    await clazz.joinUser(joinClassInfo);

    ctx.body = {
        Success: true,
        data: {}
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