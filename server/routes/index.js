const Route = require('express').Router()
const UserController = require('../controllers/userController')
const QuestionRoutes = require('./questionRoutes')
const AnswerRoutes = require('./answerRoutes')
const isLogin = require('../middlewares/authenticate')

Route.post('/register', UserController.register)
Route.post('/login', UserController.login)
Route.get('/users', UserController.getUsers)
Route.get('/verify', isLogin, UserController.verifyUser)
Route.put('/users/watch/add/:userId', isLogin, UserController.updateWatch)
Route.put('/users/watch/remove/:userId', isLogin, UserController.removeWatch)

Route.use('/answers', AnswerRoutes)
Route.use('/questions', QuestionRoutes)

module.exports = Route