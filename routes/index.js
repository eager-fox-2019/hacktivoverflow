const router = require('express').Router()
const userRoutes = require('./user.routes')
const questionRoutes = require('./question.routes')

router.use('/user', userRoutes)
router.use('/question', questionRoutes)

module.exports = router