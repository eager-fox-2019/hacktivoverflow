const Route = require('express').Router()
const QuestionController = require('../controllers/questionController')
const isLogin = require('../middlewares/authenticate')

Route.get('/', QuestionController.read)
Route.get('/:id', QuestionController.getOne)
Route.post('/', isLogin, QuestionController.create)
Route.patch('/upvotes/:id', isLogin, QuestionController.upvotes)
Route.patch('/downvotes/:id', isLogin, QuestionController.downvotes)
Route.put('/:questionId', isLogin, QuestionController.update)
Route.delete('/:questionId', isLogin, QuestionController.delete)

module.exports = Route