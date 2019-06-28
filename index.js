const express = require('express');
const app = express();
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/users');
require('./services/passport');

mongoose.connect(keys.mongoURI, () => { }, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Atlas Server Connected')
    })
    .catch(err => {
        console.log(err);
    });


app.use(bodyParser.json());
app.use(cookieSession({
    maxAge : 30*24*60*60*1000 ,
    keys : [keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());




require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// configuration for production built
if (process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}



// **************************

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log('Server listening')
});