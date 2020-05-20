const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');



function generateToken(payload){
    return new Promise(
        (resolve, reject) => {
            jwt.sign(
                payload, 
                jwtSecret, 
                {
                    expiresIn: '7d'
                }, (error, token) => {
                    if(error) reject (error);
                    resolve (token);
                }
            );
        }
    );
};

function decodeToken(token) {
    return new Promise(
        (resolve, reject) => {
            jwt.verify(token, jwtSecret, (error, decoded) => {
                if(error) reject(error);
                resolve(decoded);
            });
        }
    );
}

exports.jwtMiddleware = async (ctx, next) =>  {
    //Read access_token from ctx
    const token = ctx.cookies.get('access_token'); 
    //If no token, Go to next;
    if(!token) return next();


    try {
        // Decode Token
        const decoded = await decodeToken(token);

        // Recreate Token If expired date is less than 1 day
        if(Date.now() / 1000 - decoded.iat > 60 * 60* 24) {
            const {_id, profile} = decoded;
            const freshToken = await generateToken({ _id, profile}, 'account');

            ctx.cookies.set('access_token', freshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
                httpOnly: true
            })
        }

        ctx.request.user = decoded;
    } catch (e) {
        console.log(e);
        ctx.request.user = null;
    }

    return next();
}

exports.generateToken = generateToken;