const express = require('express')
const route = express.Router()
const User = require('./user')
const Answer = require('./answer')
const Question = require('./question')

route.use('/users', User)
route.use('/answers', Answer)
route.use('/questions', Question)

module.exports = route