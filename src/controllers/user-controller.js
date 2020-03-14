const User = require('../models/user');

module.exports = class UserController {

    static async createUser(request, response) {
        try {
            const newUser = new User(request.body);
            await newUser.save();
            response
                .status(200)
                .send('');
        } catch (error) {
            response
                .status(400)
                .send(error);
        }
    };

    static getUser(request, response) {
        User
            .find({email: request.body.email})
            .then((users) => {
                response
                    .status(200)
                    .send(users[0].toJSON());
            })
            .catch(error => {
                response
                    .status(400)
                    .send(error);
            });
    }

    static async login(request, response) {
        try {
            const user = await User.findByCredentials(request.body.email, request.body.password);
            const token = await user.generateAuthToken();
            response
                .status(200)
                .send({user: user.toJSON(), token});
        } catch (error) {
            response
                .status(401)
                .send(error);
        }
    }

    static async logout(request, response) {
        try {
            request.user.tokens = request.user.tokens.filter(token => {
                return token.token !== request.token
            });
            await request.user.save();
            response.send();
        } catch (error) {
            response
                .status(500)
                .send(error);
        }
    }

};