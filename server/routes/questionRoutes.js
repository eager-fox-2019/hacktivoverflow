const router = require('express').Router()
const questionController = require('../controllers/questionController')
const {
    Authenticate,
    AuthorizeQuestion,
    AuthorizeAnswer
} = require('../middleware/auth')

router.get('/', questionController.getAllQuestion)
router.post('/', Authenticate, questionController.askQuestion)
router.get("/tags", questionController.getAllTags)

router.get('/search', questionController.search)
router.get('/:questionId', questionController.getOneQuestion)
router.put('/:questionId', Authenticate, AuthorizeQuestion, questionController.editQuestion)
router.patch('/:questionId/upvote', Authenticate, questionController.upvoteQuestion)
router.patch('/:questionId/downvote', Authenticate, questionController.downvoteQuestion)
router.patch('/:questionId/solve', Authenticate, AuthorizeQuestion, questionController.markAsSolved) //authorize

router.get('/:questionId/answers', questionController.getAllAnswers)
router.post('/:questionId/answers', Authenticate, questionController.createAnswer)

router.get('/:questionId/answers/:answerId', questionController.getOneAnswer)
router.put('/:questionId/answers/:answerId', Authenticate, AuthorizeAnswer, questionController.editAnswer) //authorize
router.patch('/:questionId/answers/:answerId/upvote', Authenticate, questionController.upvoteAnswer)
router.patch('/:questionId/answers/:answerId/downvote', Authenticate, questionController.downvoteAnswer)

router.delete('/:questionId', Authenticate, AuthorizeQuestion, questionController.deleteQuestion)
router.delete('/:questionId/answers/:answerId', Authenticate, AuthorizeAnswer, questionController.deleteAnswer)

module.exports = router