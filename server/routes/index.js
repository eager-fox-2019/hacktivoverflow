const express = require('express')
const router = express.Router()
const userRoutes = require('./user')
const questionRoutes = require('./question')
const answerRoutes = require('./answer')

router.use('/user', userRoutes)
router.use('/answer', answerRoutes)
router.use('/question', questionRoutes)

module.exports = router