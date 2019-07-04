const router = require('express').Router()

//routers
const questionRouter = require('./questionRoutes')
const answerRouter = require('./answerRoutes')

//controllers
const userController = require('../controllers/userController')

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)

router.use('/questions', questionRouter)
router.use('/answers', answerRouter)

module.exports = router

