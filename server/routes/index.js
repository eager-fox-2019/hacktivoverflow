const router = require('express').Router()
const userRoutes = require('./users')
const questionRoutes = require('./questions')
router.use('/users', userRoutes)
router.use('/questions', questionRoutes)

module.exports = router