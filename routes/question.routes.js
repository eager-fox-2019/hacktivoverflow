const router = require('express').Router()
const controllerQuestion = require('../controllers/question.controllers.js')
const isAuthenticated = require('../middlewares/auth.js').authentication
const isAuthorized = require('../middlewares/auth.js').authQuestion

// /question
router.get('/', controllerQuestion.findAll)
router.get('/:id', controllerQuestion.findOne)

router.use(isAuthenticated)
router.post('/', controllerQuestion.create)

router.patch('/:id', isAuthorized, controllerQuestion.edit)
router.delete('/:id', isAuthorized, controllerQuestion.delete)

router.patch('/:id/:vote', isAuthorized, controllerQuestion.vote)

module.exports = router
