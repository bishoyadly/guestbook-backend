const Message = require('../models/message');

module.exports = class MessageController {

    static async addMessage(request, response) {
        try {
            const message = new Message(request.body);
            await message.save();
            response
                .status(200)
                .send();
        } catch (error) {
            response
                .status(500)
                .send(error);
        }
    }


    static async getMessages(request, response) {
        try {
            const messages = await Message.find();
            response
                .status(200)
                .send(messages);
        } catch (error) {
            response
                .status(500)
                .send(error);
        }
    }

    static async updateMessage(request, response) {
        try {
            const message = await Message.findById(request.body._id);
            message.messageText = request.body.messageText;
            message.replyMessages = request.body.replyMessages;
            await message.save();
            response
                .status(200)
                .send(message);
        } catch (error) {
            response
                .status(500)
                .send(error);
        }
    }

    static async deleteMessage(request, response) {
        try {
            const message = await Message.findById(request.params.messageId);
            await message.delete();
            response
                .status(200)
                .send(message);
        } catch (error) {
            response
                .status(500)
                .send(error);
        }
    }

};