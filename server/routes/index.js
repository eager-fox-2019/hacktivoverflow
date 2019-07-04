const router = require('express').Router()
const userRoutes = require('./users')
const questionRoutes = require('./questions')
const answerRoutes = require('./answers')
router.use('/users', userRoutes)
router.use('/questions', questionRoutes)
router.use('/answers', answerRoutes)

module.exports = router