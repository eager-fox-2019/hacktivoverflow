const router = require('express').Router()
const questionRoute = require('./question')
const answerRoute = require('./answer')
const userController = require('../controllers/user')

router.use('/questions',questionRoute)
router.use('/answers',answerRoute)

router.post('/login',userController.login)
router.post('/register',userController.register)
router.patch('/users/:userId/watchTag',userController.updateWatchTag)


module.exports = router