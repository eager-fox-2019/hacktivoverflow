const express = require('express')
const route = express.Router()
const AnswerController = require('../controllers/answerController')
const Authentication = require('../middlewares/authentication')
const AnswerAuthorization = require('../middlewares/answerAutho')

// READ
route.get('/allAnswer/:id', AnswerController.findAll)
route.get('/:id', AnswerController.findOne)

route.use(Authentication)

// Update
route.patch('/upvote/:id', AnswerController.upvote)
route.patch('/downvote/:id', AnswerController.downvote)

route.patch('/:id', AnswerAuthorization, AnswerController.update)

route.delete('/:id', AnswerAuthorization, AnswerController.delete)

// Create
route.post('/', AnswerController.create)

module.exports = route