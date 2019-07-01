const express = require('express')
const router = express.Router()

const routerUser = require('./users')
const routerQuestion = require('./questions')

router.use('/users', routerUser)
router.use('/questions', routerQuestion)

module.exports = router