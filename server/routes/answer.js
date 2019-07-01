const router = require('express').Router()
const answerController = require('../controllers/answerController')
const { authentication, authorizationAnswer } = require('../middlewares/auth')

router.get('/:answerId', answerController.getAnswer)
router.use(authentication)
router.post('/', answerController.createAnswer)
router.use(authorizationAnswer)
router.patch('/:answerId', answerController.editAnswer)
router.delete('/:answerId', answerController.deleteAnswer)

module.exports = router