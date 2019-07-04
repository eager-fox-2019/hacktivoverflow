const router = require('express').Router()
const qController = require('../controllers/question.controller')
const authMiddlware = require('../middleware/token.middleware')

router.get('/', qController.getQuestion)
router.get('/:id', qController.getQuestionDetail)
router.post('/', authMiddlware, qController.postQuestion)
router.patch('/:id/:action', authMiddlware, qController.vote)

module.exports = router