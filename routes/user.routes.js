const router = require('express').Router()
const controllerUser = require('../controllers/user.controllers.js')
const isAuthenticated = require('../middleware/auth.js').authentication
const isAuthorized = require('../middleware/auth.js').authUser

// /user
router.post('/', controllerUser.register) //register
router.post('/login', controllerUser.login)

router.use(isAuthenticated)
router.patch('/', isAuthorized, controllerUser.update)

module.exports = router
