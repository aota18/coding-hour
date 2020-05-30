const Account = require('models/Account');

exports.getClass = async (ctx) => {
    const { userId } = ctx.params;

    const account = await Account.findOne({_id: userId});

    if(account == undefined){
        ctx.status = 404;
        ctx.body = {
            Success: false,
            data: {},
            message: "User Undefined"
        }
        return;
    }
    
    ctx.body = {
        Success: true,
        data:{
            class: account.classes
        }
    };
}

exports.getUser = async (ctx) => {
    const { user } = ctx.params;

    const account = await Account.findByUserId(user);

    ctx.body = {
        user: account
    }
}