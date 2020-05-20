const Joi = require('joi');
const Account = require('models/Account');

// Local Sign up
exports.localRegister = async (ctx) => {

    //Step 1. Validation
    // Username : Alphabet & Number Between 4 and 15
    // Email : Email Format
    // Password : At least 6 
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(4).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6)
    });
    
    const result = Joi.validate(ctx.request.body, schema);

    // Schema Validation Fail
    if(result.error) {
        ctx.status = 400;
        return ;
    }


    //Step 2. Duplicate Check
    let existing = null;
    try {
        existing = await Account.findByEmailOrUsername(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    if(existing){
        ctx.status =409; //Conflict

        ctx.body = {
            key: existing.email === ctx.request.body.email ? 'email' : 'username'
        };

        return;
    }

    // Create Account
    let account = null;
    try {
        account = await Account.localRegister(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    let token = null;
    try {
        token = await account.generateToken();
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, { httpOnly: true, sameSite: 'none', maxAge: 1000*60*60*24*7})
    ctx.body = account.profile; // Answer to Profile Info.
}

// Local Login
exports.localLogin = async (ctx) => {
    
    //Validation
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        return;
    }
    
    const { email, password } = ctx.request.body;

    let account = null;
    try {
        account = await Account.findByEmail(email);

    } catch (e) {
        ctx.throw(500, e);
    }

    if(!account || !account.validatePassword(password)) {
        // If user doesn't exist or wrong password
        ctx.status = 403;
        return;
    }

    let token = null;
    try {
        token = await account.generateToken();
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, { httpOnly: true, sameSite: 'none', secure:true,  maxAge: 1000*60*60*24*7})
    ctx.body = account.profile;
}

// Check email exists 
exports.exists = async (ctx) => {
    const { key, value} = ctx.params;

    let account = null;

    try {
      
        account = await (key === 'email' ? Account.findByEmail(value) : Account.findByUsername(value));    
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = {
        exists: account !== null
    };
}

// Logout
exports.logout = async (ctx) => {
    ctx.cookies.set('access_token', null, {
        maxAge: 0,
        httpOnly: true
    });

    ctx.status = 204;
}


// Check if there is cookie
exports.check = (ctx) => {
    //console.log(ctx.request)
    const { user } = ctx.request;

    if(!user) {
        ctx.status = 403;
        return;
    }

    ctx.body = user.profile;
}