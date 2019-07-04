const router = require('express').Router()
const ControllerQuestion = require('../controllers/questions')
const authentication = require('../middlewares/authentication'
)
router.get('/', ControllerQuestion.findAll)
router.use(authentication)
router.get('/:id', ControllerQuestion.findOne)
router.delete('/:id', ControllerQuestion.delete)
router.post('/', ControllerQuestion.create)
router.patch('/:id', ControllerQuestion.update)
router.patch('/vote/:id', ControllerQuestion.updateVote)
router.patch('/answer/:id', ControllerQuestion.inputAnswer)

module.exports = router