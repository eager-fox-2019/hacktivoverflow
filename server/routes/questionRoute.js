const router = require('express').Router()
const QuestionController = require('../controllers/questionController')
const {authentication, authorization} = require('../middlewares/auth')

router.get('/', QuestionController.findAll)
router.get('/:id', QuestionController.findOne)

router.use(authentication)
router.post('/', QuestionController.create)
router.patch('/upvote/:id', QuestionController.setUpvote)
router.patch('/downvote/:id', QuestionController.setDownvote)
router.post('/:id', QuestionController.createAnswer)

router.put('/:id', authorization.question, QuestionController.update)
router.delete('/:id', authorization.question, QuestionController.delete)

module.exports = router