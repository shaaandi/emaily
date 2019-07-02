const requireLogin = require('../middlewares/requireLogin');
const requireCredits =  require('../middlewares/requireCredits');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/Mailer');



const Survey = mongoose.model('surveys');



module.exports =  app => {
    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
        const {title, subject, body, recipients} = req.body;
        const survey =  new Survey({
            title,
            subject,
            body,
            recipients : recipients.split(',').map(email => {
                return {
                    email : email.trim()
                }
            }),
            _user : req.user.id,
            dateSent : Date.now()
        })
        
         
        const mailer = new Mailer(survey, surveyTemplate(survey));
        
        const response= await mailer.send();
        res.send(response);
       
    });
}

