const router = require('express').Router()
const controllerUser = require('../controllers/user.controllers.js')
const isAuthenticated = require('../middlewares/auth.js').authentication
const isAuthorized = require('../middlewares/auth.js').authUser

// /user
router.post('/', controllerUser.register) //register
router.post('/login', controllerUser.login)

router.use(isAuthenticated)
router.get('/', controllerUser.findOne)
router.patch('/', isAuthorized, controllerUser.update)

router.get('/questions', controllerUser.findQuestions)
router.get('/answers', controllerUser.findQuestions)

module.exports = router
