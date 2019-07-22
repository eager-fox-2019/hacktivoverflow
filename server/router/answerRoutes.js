const router = require('express').Router()
const answerController = require('../controllers/answerController')
const authentication = require('../middleware/authentication')

// from localhost:3000/answers
router.use(authentication)

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Masuk ke routes answer'
    })
})

router.get('/usersAnswer', authentication, answerController.getUsersAnswer)
router.get('/:questionId', answerController.getAnswersOfOneQuestion)
router.post('/:questionId', answerController.createAnswer)
router.delete('/:id', answerController.deleteAnswer)
router.patch('/:id', answerController.updateAnswer)
router.patch('/upvote/:id', answerController.upVote)
router.patch('/downvote/:id', answerController.downVote)
router.patch('/removevote/:id', answerController.removeVote)
module.exports = router