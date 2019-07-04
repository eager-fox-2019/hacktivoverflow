const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')
const {Authentication} = require('../Middleware/auth')

router.use('/user', userRouter)
router.use('/question', Authentication, questionRouter)
router.use('/answer', answerRouter)

module.exports = router