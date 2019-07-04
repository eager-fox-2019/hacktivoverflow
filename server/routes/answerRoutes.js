const Route = require('express').Router()
const AnswerController = require('../controllers/answerController')
const isLogin = require('../middlewares/authenticate')

Route.get('/', AnswerController.read)
Route.post('/', isLogin, AnswerController.create)
Route.put('/:answerId', isLogin, AnswerController.update)
Route.delete('/:answerId', isLogin, AnswerController.delete)

module.exports = Route