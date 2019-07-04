const router = require('express').Router()
const answerController = require('../controllers/answer')
const { authentication, authorizationAnswer } = require('../middlewares/auth')

router.get('/:answerId', answerController.getAnswer)
router.get('/:answerId', answerController.getAllAnswer) //for test purpose only
router.use(authentication)
router.post('/', answerController.addAnswer)
router.patch('/update-detail/:answerId', answerController.likesUpdate)
router.get('/:userId', answerController.getAnswer)
router.patch('/:answerId', authorizationAnswer, answerController.update)
router.delete('/:answerId', authorizationAnswer, answerController.delete)

module.exports = router