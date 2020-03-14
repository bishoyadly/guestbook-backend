const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageText: {
        type: String,
        required: true
    },
    replyMessages: [{
        type: String
    }]
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;