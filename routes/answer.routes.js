const router = require('express').Router()
const controllerAnswer = require('../controllers/answer.controllers.js')
const isAuthenticated = require('../middlewares/auth.js').authentication
const isAuthorized = require('../middlewares/auth.js').authAnswer

// /answer
router.get('/:questionId', controllerAnswer.findAll)
router.get('/:id', controllerAnswer.findOne)

router.use(isAuthenticated)
router.post('/', controllerAnswer.create)

router.patch('/:id', isAuthorized, controllerAnswer.edit)
router.delete('/:id', isAuthorized, controllerAnswer.delete)

router.patch('/:id/:vote', isAuthorized, controllerAnswer.vote)

module.exports = router
