const Account = require('models/Account');

exports.getClass = async (ctx) => {
    const { user } = ctx.params;

    const account = await Account.findOne({_id: user});

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
        classes: account.classes
    };
}