const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authenticate = require('../../middlewares/authenticate')

router.get('/mytag', authenticate, userController.myTag)
router.put('/tag', authenticate, userController.addTag)
router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.post('/verify', authenticate)

module.exports = router