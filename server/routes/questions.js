const express = require('express')
const router = express.Router()

const ControllerQuestion = require('../controllers/controller-question')
const { authentication, authorizationQuestion } = require('../middlewares/author-authen')

router.get('/', ControllerQuestion.readAllwFilter)
router.get('/:id', ControllerQuestion.readOne)
router.use(authentication)
router.post('/', ControllerQuestion.create)
router.use('/:id', authorizationQuestion)
router.put('/:id', ControllerQuestion.update)
router.delete('/:id', ControllerQuestion.delete)

module.exports = router