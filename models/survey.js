const mongoose = require('mongoose');
const recipientSchema = require('./recipient');
const surveySchema = new mongoose.Schema({
    title : String,
    subject : String,
    body : String,
    yes : {
        type : Boolean,
        default : 0
    },
    no : {
        type : Boolean,
        default : 0
    },
    recipients : [recipientSchema],
    dateSent : Date,
    lastResponded : Date,
    _user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    }
})


mongoose.model('surveys', surveySchema);