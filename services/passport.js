const passport = require('passport');
const keys = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',           // Google OAuth kicks the request back to this route
        }, 
        (accessToken, refreshToken, profile, done) => {
            console.log('access token:', accessToken);
            console.log('refresh token:', refreshToken);
            console.log('profile:', profile);
        }
    )
);