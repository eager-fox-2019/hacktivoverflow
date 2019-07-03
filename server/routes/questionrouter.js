const router = require('express').Router()
const QuestionController = require('../controllers/questioncontroller')
const { questionAuthorization } = require('../middlewares/authorization')
const { authentication } = require('../middlewares/authentication')

router.get('/', QuestionController.getPublicQuestions)

router.use(authentication)
router.post('/', QuestionController.addQuestion)
router.patch('/:id', questionAuthorization, QuestionController.editQuestion)
router.delete('/:id', questionAuthorization, QuestionController.deleteQuestion)

module.exports = router