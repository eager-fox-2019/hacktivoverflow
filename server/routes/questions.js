const express = require('express')
const router = express.Router()

const ControllerQuestion = require('../controllers/controller-question')
const { authentication, authorizationQuestion } = require('../middlewares/author-authen')

router.get('/', ControllerQuestion.readAllwFilter)
router.get('/users/:userid', ControllerQuestion.readAllOneUser)
router.get('/:id', ControllerQuestion.readOne)
router.use(authentication)
router.post('/', ControllerQuestion.create)
router.post('/:id/upvote', ControllerQuestion.vote)
router.post('/:id/downvote', ControllerQuestion.vote)
router.use('/:id', authorizationQuestion)
router.put('/:id', ControllerQuestion.update)
router.delete('/:id', ControllerQuestion.delete)

module.exports = router