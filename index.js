const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

// CookieSession middleware creates a 30-day cookie
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,   // 30 days, 24hrs, 60 mins, 60 seconds, 1000 miliseconds. Nasty. 
        keys: [keys.cookieKey]
    })
);

// Passport middleware initialises and manages the authentication and 
// checking of existing cookies against the users in db
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
