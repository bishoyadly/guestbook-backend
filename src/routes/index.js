const router = require('express').Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user-controller');
const messageController = require('../controllers/message-controller');

router
    .route('/users')
    .post(userController.createUser)
    .get(auth, userController.getUser);

router
    .route('/login')
    .post(userController.login);

router
    .route('/logout')
    .post(auth, userController.logout);


router
    .route('/messages')
    .post(auth, messageController.addMessage)
    .get(auth, messageController.getMessages)
    .put(auth, messageController.updateMessage);


router
    .route('/messages/:messageId')
    .delete(auth, messageController.deleteMessage);


module.exports = router;