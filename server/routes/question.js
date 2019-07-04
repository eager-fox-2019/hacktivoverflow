const express = require('express')
const questionRouter = express.Router()
const QuestionController = require('../controllers/question')
const authentication = require('../middlewares/authentication')
const {authorization} = require('../middlewares/authorization')

questionRouter.get('/',QuestionController.fetch)
questionRouter.get('/detail/:questionid',QuestionController.fetchOne)
questionRouter.use(authentication)
questionRouter.get('/myquestion',QuestionController.fetchMine)
questionRouter.patch('/downvote/:questionid',QuestionController.updateDownVote)
questionRouter.patch('/upvote/:questionid',QuestionController.updateUpVotes)
questionRouter.use('/:questionid',authorization)
questionRouter.post('/',QuestionController.create)
questionRouter.delete('/:questionid',QuestionController.delete)
questionRouter.put('/:questionid',QuestionController.EditQuestion)


module.exports = questionRouter