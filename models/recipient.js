const mongoose = require('mongoose')

const  recipientSchema = new mongoose.Schema({
    email : String,
    response : {
        type : Boolean,
        default : false
    }
})

module.exports  = recipientSchema;