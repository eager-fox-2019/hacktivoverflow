const router = require('express').Router()
const questionController = require('../controllers/question')
const { authentication, authorizationQuestion } = require('../middlewares/auth')

router.get('/', questionController.getAllQuestion)
router.get('/:questionId', questionController.getquestion)
router.use(authentication)
router.post('/', questionController.createQuestion)
router.use(authorizationQuestion)
router.patch('/:questionId', questionController.editQuestion)
router.delete('/:questionId', questionController.deleteQuestion)

module.exports = router