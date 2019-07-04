const router = require('express').Router()
const questionController = require('../controllers/question')
const { authentication, authorizationQuestion } = require('../middlewares/auth')

router.get('/', questionController.getAllQuestion)
router.get('/:questionId', questionController.getQuestion)
router.use(authentication)
router.post('/', questionController.addQuestion)
router.patch('/update-detail/:questionId', questionController.update)
// router.get('/:userId', questionController.getUserQuestion) // next improvement
router.patch('/:questionId', authorizationQuestion, questionController.update)
router.delete('/:questionId', authorizationQuestion, questionController.delete)

module.exports = router