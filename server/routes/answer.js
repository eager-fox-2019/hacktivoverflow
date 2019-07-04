const router = require("express").Router()
const answer = require('../controllers/answer')
const { authorizeAnswer } = require('../middlewares/authorize')
const authenticate = require('../middlewares/authenticate')
const onlyOnce = require('../middlewares/onlyOnce')

router.get('/question/:questionId', answer.readByQuestion)
router.get('/:_id', answer.readOne)

router.use(authenticate)

router.post('/:questionId', onlyOnce, answer.create)
router.patch('/:_id', authorizeAnswer, answer.update)
router.put('/:_id', authorizeAnswer, answer.update)
router.delete('/:_id', authorizeAnswer, answer.delete)

module.exports = router