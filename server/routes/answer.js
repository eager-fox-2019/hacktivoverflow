const route = require('express').Router();
const answerController = require('../controllers').Answer;
const authentication = require('../middlewares/authentication')
const authorizationAnswer = require('../middlewares/authorizationAnswer');

route.post('/', authentication, answerController.create)
route.patch('/:answerId', authentication, authorizationAnswer, answerController.update)
route.patch('/votes/:answerId', authentication, answerController.update)
route.delete('/many', authentication, answerController.deleteMany)
route.delete('/:answerId', authentication, authorizationAnswer, answerController.delete)

module.exports = route;