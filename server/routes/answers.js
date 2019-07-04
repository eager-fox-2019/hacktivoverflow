const router = require('express').Router()
const ControllerAnswer = require('../controllers/answers')
const authentication = require('../middlewares/authentication')

router.get('/:id', ControllerAnswer.findAll)
router.use(authentication)
router.post('/:id', ControllerAnswer.create)
router.patch('/vote/:id', ControllerAnswer.updateVote)
router.delete('/:id', ControllerAnswer.delete)
module.exports = router