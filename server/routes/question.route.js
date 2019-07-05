const router = require('express').Router()
const qController = require('../controllers/question.controller')
const authMiddlware = require('../middleware/token.middleware')
const questionAuthorization = require('../middleware/question.authorization.middleware')

router.get('/', qController.getQuestion)
router.get('/:id', qController.getQuestionDetail)
router.post('/', authMiddlware, qController.postQuestion)
router.patch('/:id/:action', authMiddlware, qController.vote)
router.patch('/:id', authMiddlware, questionAuthorization, qController.updateQuestion)
router.delete('/:id', authMiddlware, questionAuthorization, qController.deleteQuestion)

module.exports = router