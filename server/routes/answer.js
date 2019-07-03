const route = require('express').Router();
const answerController = require('../controllers').Answer;
const authentication = require('../middlewares/authentication')

route.post('/', authentication, answerController.create)

module.exports = route;