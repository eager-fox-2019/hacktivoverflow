const router = require('express').Router()
const AnswerController = require('../controllers/answercontroller')
const { authentication } = require('../middlewares/authentication')


router.use(authentication)
router.post('/', AnswerController.addAnswer)
router.patch('/vote/:id', AnswerController.voteAnswer)

module.exports = router