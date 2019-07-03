const router = require('express').Router()
const userRouter = require('./userrouter')
const questionRouter = require('./questionrouter')


router.use('/users', userRouter)
router.use('/questions', questionRouter)

module.exports = router