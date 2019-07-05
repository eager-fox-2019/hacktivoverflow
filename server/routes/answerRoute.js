const router = require('express').Router()
const answerController = require('../controllers/answerController')
const {
    authentication,
    answerAuthorization
} = require('../middlewares/auth')

router.get('/all/:questionId', answerController.findAll) // √

router.use('/', authentication)

router.post('/add/:questionId', answerController.create)  //  √
router.patch('/upVote', answerController.upVote)  // √
router.patch('/downVote', answerController.downVote)  // √

router.patch('/update/:answerId', answerAuthorization, answerController.update)  //  √
router.delete('/delete/:answerId', answerAuthorization, answerController.delete)  // √


// passed test by postman
module.exports = router