const router = require('express').Router()
const AnswerController = require('../controllers/answerController')
const {authentication, authorization} = require('../middlewares/auth')

router.get('/all/:id', AnswerController.findAll)

router.use(authentication)
// router.post('/:id', AnswerController.create)
router.patch('/upvote/:id', AnswerController.setUpvote)
router.patch('/downvote/:id', AnswerController.setDownvote)
router.get('/:id', authorization.answer, AnswerController.findOne)
router.put('/:id', authorization.answer, AnswerController.update)

module.exports = router