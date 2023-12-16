

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require("dotenv").config();

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_OAUTH_CLIENT_ID ,
            clientSecret:process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            callbackURL:'/auth/redirect/google',
            scope:['profile', 'email']
        },
        function (accessToken, refreshToken, profile, callback)
        {
            return callback(null, profile);
        }
    )
)

passport.serializeUser( (user, done) => {
    done(null, user);
})

passport.deserializeUser( (user, done) => {
    done(null, user);
})

