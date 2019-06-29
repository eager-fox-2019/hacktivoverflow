const router = require('express').Router()
const questionRoutes = require('./question')
const answerRoutes = require('./answer')
const userRoutes = require('./user')

router.use('/user', userRoutes)
router.use('/question', questionRoutes)
router.use('/answer', answerRoutes)

module.exports = router