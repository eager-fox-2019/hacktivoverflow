const router = require("express").Router()
const question = require('../controllers/question')
const { authorizeQuestion } = require('../middlewares/authorize')
const authenticate = require('../middlewares/authenticate')

router.get('/', question.readAll)
router.get('/user/:userId', question.readAll)
router.get('/:_id', question.readOne)

router.use(authenticate)

router.post('/', question.create)
router.patch('/:_id', authorizeQuestion, question.update)
router.put('/:_id', authorizeQuestion, question.update)
router.delete('/:_id', authorizeQuestion, question.delete)

module.exports = router