const express = require('express')
const router = express.Router()

const ControllerAnswer = require('../controllers/controller-answer')
const { authentication, authorizationAnswer } = require('../middlewares/author-authen')

router.get('/users/:userId', ControllerAnswer.readAllAnswerOneUser)
router.use(authentication)
router.post('/', ControllerAnswer.create)
router.post('/:id/voteup', ControllerAnswer.vote)
router.post('/:id/votedown', ControllerAnswer.vote)
router.use('/:id', authorizationAnswer)
router.put('/:id', ControllerAnswer.update)
router.delete('/:id', ControllerAnswer.delete)

module.exports = router