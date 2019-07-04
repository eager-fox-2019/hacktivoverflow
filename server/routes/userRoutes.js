const userController = require('../controllers/userController')
const router = require('express').Router()
const {
    Authenticate
} = require('../middleware/auth')

router.get('/', Authenticate, userController.getUser)
router.get('/questions', Authenticate, userController.getUserQuestions)
router.put('/interest', Authenticate, userController.updateInterest)

module.exports = router