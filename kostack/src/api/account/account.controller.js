const Account = require('../../models/account.js');
const Class = require('../../models/class.js');

exports.getClass = async (ctx) => {
    const { userId } = ctx.params;

    const account = await Account.findByUserId(userId);

    if(account == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "User Undefined"
        }
        return;
    }

    const classes = await Class.findByUserId(userId);
    const ret = [];

    for(let i=0;i<classes.length;i++){
        ret.push({
            classId: classes[i]._id,
            name: classes[i].name
        });
    }
    
    ctx.body = {
        Success: true,
        data:{
            class: ret
        }
    };
}

exports.getUser = async (ctx) => {
    const { userId } = ctx.params;

    const account = await Account.findByUserId(userId);

    ctx.body = {
        user: account
    }
}