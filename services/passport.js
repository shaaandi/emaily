const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user,done) => {
    done(null, user.id)
});

passport.deserializeUser((id,done) => {
    User.findById(id).then(user => {
        done(null,user);
    })
    
})

passport.use(new GoogleStrategy(
    {
        clientID : keys.googleClientID,
        clientSecret : keys.googleClientSecret,
        callbackURL : '/auth/google/return',
        proxy : true
    }, async (accessToken, refreshToken, profile, done )=> {
        
        if (mongoose.connection.readyState == 0) console.log('DB not connected');
        let existingUser = await User.findOne({googleID : profile.id})
        if (existingUser) return done(null, existingUser)
        let newUser = await new User({googleID: profile.id}).save()
        done(null, newUser)
        
       
    }
));