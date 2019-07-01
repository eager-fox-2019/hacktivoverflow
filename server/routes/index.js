const express = require('express')
const router = express.Router()

const routerUser = require('./users')
const routerQuestion = require('./questions')
const routerAnswer = require('./answers')

router.use('/users', routerUser)
router.use('/questions', routerQuestion)
router.use('/answers', routerAnswer)

module.exports = router