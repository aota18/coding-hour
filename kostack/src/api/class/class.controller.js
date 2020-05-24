const Account = require('models/Account');
const Class = require('models/Class');

exports.register = async (ctx) => {
    try{
        const clazz = await Class.register(ctx.request.body);

        const joinClassInfo = {
            userId: ctx.request.body.userId,
            classId: clazz._id,
            auth: "Admin",
            rolename: ctx.request.body.role
        };

        await Account.joinClass(joinClassInfo);
    }catch(e){
        ctx.throw(500, e);
    }

    ctx.body = {
        Success: Boolean,
        data: {}
    }
};

exports.join = async (ctx) => {
    try{
        const joinClassInfo = {
            userId: ctx.request.body.userId,
            classId: ctx.request.body.classId,
            auth: "Participant",
            rolename: "Student"
        };

        await Account.joinClass(joinClassInfo);
    }catch(e){
        ctx.throw(500, e);
    }

    ctx.body = {
        Success: Boolean,
        data: {}
    }
}