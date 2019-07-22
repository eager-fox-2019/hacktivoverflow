const router = require('express').Router()
const questionController = require('../controllers/questionController')
const authentication = require('../middleware/authentication')

// from localhost:3000/question
router.use(authentication)

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Masuk ke routes answer'
    })
})

router.get('/', questionController.getAllQuestion)
router.get('/usersQuestion', authentication, questionController.getUsersQuestion)
router.get('/:id', questionController.getOneQuestion )
router.post('/', questionController.createQuestion)
router.delete('/:id', questionController.deleteQuestion)
router.patch('/:id',  questionController.updateQuestion)
router.patch('/upvote/:id', questionController.upVote)
router.patch('/downvote/:id', questionController.downVote)
router.patch('/removevote/:id', questionController.removeVote)

module.exports = router