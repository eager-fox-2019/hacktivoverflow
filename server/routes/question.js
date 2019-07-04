const express = require('express')
const route = express.Router()
const QuestionController = require('../controllers/questionController')
const Authentication = require('../middlewares/authentication')
const QuestionAuthorization = require('../middlewares/questionAutho')

// READ
route.get('/', QuestionController.findAll)
route.get('/random', QuestionController.random)
route.get('/:id', QuestionController.findOne)


route.use(Authentication)

// Create
route.post('/', QuestionController.create)
route.get('/findMine/:id', QuestionController.findMine)


// UPDATE
route.patch('/upvote/:id', QuestionController.upvote)

route.patch('/downvote/:id', QuestionController.downvote)

route.patch('/:id', QuestionAuthorization, QuestionController.update)

// DELETE
route.delete('/:id', QuestionAuthorization, QuestionController.delete)

module.exports = route