const route = require('express').Router();
const questionController = require('../controllers').Question;
const authentication = require('../middlewares/authentication');

route.get('/', questionController.readAll);
route.post('/', authentication, questionController.create);
route.patch('/:questionId', authentication, questionController.update);
route.delete('/:questionId', authentication, questionController.delete);

module.exports = route;