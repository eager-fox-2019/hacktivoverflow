const route = require('express').Router();
const questionController = require('../controllers').Question;
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorizationQuestion')

route.get('/', questionController.readAll);
route.post('/', authentication, questionController.create);
route.patch('/:questionId', authentication, authorization, questionController.update);
route.patch('/votes/:questionId', authentication, questionController.update);
route.delete('/:questionId', authentication, authorization, questionController.delete);

module.exports = route;