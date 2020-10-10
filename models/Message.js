const mongoose = require('mongoose');

const msgSchema =  new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    email:{
        type: String
    },
    body:{
        type: String,
        required:[true, 'Message can not be empty'],
    },
    replies: [this]
}, { timestamps: true });

const Message = mongoose.model('Message',msgSchema);

module.exports = Message;