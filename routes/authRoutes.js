const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google',{
        scope : ['profile', 'email']
    }));
    
    app.get('/auth/google/return', passport.authenticate('google'), (req,res) => {
        
        res.send("You are loged in")
    });
    app.get('/api/user', (req,res) => {
        res.send(req.user)
    })
    app.get('/logout', (req,res) => {
        req.logout();
        res.send('Ur loged out, get the hell away')
    })
    
}
