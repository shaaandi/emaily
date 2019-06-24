const express = require('express');
const app = express();
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/users');
require('./services/passport');

mongoose.connect(keys.mongoURI, () => { }, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Atlas Server Connected')
    })
    .catch(err => {
        console.log(err);
    });



app.use(cookieSession({
    maxAge : 30*24*60*60*1000 ,
    keys : [keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req,res) => {
    res.send(req.user)
});

require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log('Server listening')
});