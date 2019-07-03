const router = require('express').Router()
const Users = require('./user')
const Questions = require('./question')
const Answers = require('./answer')

router.use('/api/user', Users)
router.use('/api/question', Questions)
router.use('/api/answer', Answers)

module.exports = router