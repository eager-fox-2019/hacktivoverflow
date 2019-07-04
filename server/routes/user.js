const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/register', userController.register)
router.post('/login', userController.login)
// router.get('/get', userController.findAll) //for test purpose

module.exports = router