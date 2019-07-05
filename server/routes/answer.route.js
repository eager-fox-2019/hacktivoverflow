const router = require('express').Router()
const aController = require('../controllers/answer.controller')
const authMiddlware = require('../middleware/token.middleware')
const answerAuthorization = require('../middleware/answer.authorization.middleware')

router.post('/', authMiddlware, aController.postAnswer)
router.patch('/:id/:action', authMiddlware, aController.vote)
router.patch('/:id', authMiddlware, answerAuthorization, aController.updateAnswer)
router.get('/:id', aController.getAnswerDetail)

module.exports = router