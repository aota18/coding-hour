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

    const user = await Account.findOne({_id: ctx.request.body.userId});

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

    const user = await Account.findOne({_id: ctx.request.body.userId});

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
    

    const clazz = await Class.findOne({_id: ctx.request.body.classId});

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