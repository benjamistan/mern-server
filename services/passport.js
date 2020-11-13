const passport = require('passport');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const { googleClientId } = require('../config/keys');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 

const User = mongoose.model('users');       // single argument means we're fetching from mongoose (two args is creating)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null,user));
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientId,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',           // Google OAuth kicks the request back to this route
            proxy: true
        }, 
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
                .then(existingUser => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({ googleId: profile.id })
                            .save()
                            .then(user => done(null, user));
                    }
            });
        }
    )
);