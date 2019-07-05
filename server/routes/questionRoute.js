const router = require('express').Router()
const questionController = require('../controllers/questionController')
const {
    authentication,
    questionAuthorization
} = require('../middlewares/auth')

router.get('/all', questionController.findAll)  // √
router.get('/one/:questionId', questionController.findOne)  // √

router.use('/', authentication)

router.post('/add', questionController.create)  // √
router.patch('/upvote/:questionId', questionController.upVote)  // √
router.patch('/downvote/:questionId', questionController.downVote)  // √

router.patch('/update/:questionId', questionAuthorization, questionController.update)  // √
router.delete('/delete/:questionId', questionAuthorization, questionController.delete)  // √


// passed postman-test
module.exports = router