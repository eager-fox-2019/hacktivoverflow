const router = require('express').Router()
const questionController = require('../controllers/question')
const { authentication, authorizationQuestion } = require('../middlewares/auth')

router.get('/', questionController.getAllQuestion)
router.get('/:questionId', questionController.getQuestion)
router.use(authentication)
router.post('/', questionController.addQuestion)
router.patch('/update-detail/:questionId', questionController.update)
router.use(authorizationQuestion)
router.get('/:userId', questionController.getUserQuestion)
router.patch('/:questionId', questionController.update)
router.delete('/:questionId', questionController.delete)

module.exports = router