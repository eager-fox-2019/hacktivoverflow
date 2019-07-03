const router = require('express').Router()
const AnswerController = require('../controllers/answer')
const authenticate = require('../middlewares/authentication')

router.get('/',AnswerController.getAll)
router.get('/:questionId/answer',AnswerController.getAnswerByQuestion)
router.get('/profile/:userId',AnswerController.getUserAnswer)
router.use(authenticate)

router.post('/:questionId',AnswerController.create)
router.get('/:answerId',AnswerController.getOne)
router.patch('/:answerId',AnswerController.update)
router.patch('/:answerId/upvote',AnswerController.upvote)
router.patch('/:answerId/downvote',AnswerController.downvote)
router.delete('/:questionId/:answerId',AnswerController.delete)

module.exports = router