
const passport = require("passport");


//handle google redirect
exports.googleOauthRedirect = passport.authenticate('google');

//handle google oauth 2.0 callback
exports.googleOauthCallback = passport.authenticate('google', {
        successRedirect:'/auth/login/success',
        failureRedirect:'/auth/login/failed'
    })


//handle google oauth 2.0 scopes
exports.googleOauthScopes = passport.authenticate('google', 
    { 
        scope: ['https://www.googleapis.com/auth/plus.login'],
        prompt:'consent' 
    })


//handle google auth 2.0 when success
exports.googleOauthSuccess = (req, res) => {
    try
    {
        if (req.user)
        {
            console.log(req.user);
            return res.status(200).json(req.user);
        }
        else
        {
            return res.status(403).json({
                type:'failed',
                message:'Not Authorized'
            });
        }
    }
    catch (err)
    {
        return res.status(400).json({
            message:'Something went wrong.'
        });
    }
    
}

//handle google auth 2.0 failure
exports.googleOauthFailed = (req, res) => {
    return res.status(401).json({
        error:true,
        message:'Log in failure',
    })
}
