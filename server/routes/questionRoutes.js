const Route = require('express').Router()
const QuestionController = require('../controllers/questionController')
const isLogin = require('../middlewares/authenticate')
const isAuthor = require('../middlewares/authorize')

Route.get('/', QuestionController.read)
Route.get('/:id', QuestionController.getOne)
Route.post('/', isLogin, QuestionController.create)
Route.patch('/upvotes/:id', isLogin, QuestionController.upvotes)
Route.patch('/downvotes/:id', isLogin, QuestionController.downvotes)
Route.put('/:questionId', isLogin, isAuthor, QuestionController.update)
Route.put('/answers/:questionId', isLogin, QuestionController.updateAnswer)
Route.delete('/:questionId', isLogin, isAuthor, QuestionController.delete)

module.exports = Route