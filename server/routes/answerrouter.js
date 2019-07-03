const router = require('express').Router()
const AnswerController = require('../controllers/answercontroller')
const { authentication } = require('../middlewares/authentication')


router.use(authentication)
router.post('/', AnswerController.addAnswer)

module.exports = router