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
        callbackURL : '/auth/google/return'
    }, (accessToken, refreshToken, profile, done )=> {
        
        if (mongoose.connection.readyState == 0)
            console.log('DB not connected');

        User.findOne({googleID : profile.id})
        .then((existingUser) => {
            console.log('test')
            if(existingUser){
                console.log(existingUser)
                done(null,existingUser);
            }
            else {
                new User({googleID : profile.id}).save()
                .then(newUser => {
                    done(null, newUser);
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
        
       
    }
));