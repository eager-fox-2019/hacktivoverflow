const router = require('express').Router()
const userRoutes = require('./user.routes')
const questionRoutes = require('./question.routes')
const answerRoutes = require('./answer.routes')

router.use('/user', userRoutes)
router.use('/question', questionRoutes)
router.use('/answer', answerRoutes)

module.exports = router