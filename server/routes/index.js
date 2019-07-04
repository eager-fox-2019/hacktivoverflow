const router = require('express').Router()
const questionRoute = require('./questionRoute')
const answerRoute = require('./answerRoute')
const UserController = require('../controllers/userController')


router.use('/login', UserController.login)
router.use('/register', UserController.create)
router.use('/questions', questionRoute)
router.use('/answers', answerRoute)

module.exports = router