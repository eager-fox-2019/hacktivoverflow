const express = require('express')
const answerRouter = express.Router()
const AnswerController = require('../controllers/answer')
const authentication = require('../middlewares/authentication')
// const {authorization} = require('../middlewares/authorization')

answerRouter.get('/:questionid',AnswerController.fetch)
answerRouter.use(authentication)
answerRouter.post('/',AnswerController.create)
answerRouter.patch('/upvote/:answerid',AnswerController.updateUpVotes)
answerRouter.patch('/downvote/:answerid',AnswerController.updateDownVote)
answerRouter.put('/:answerid',AnswerController.EditAnswer)

module.exports = answerRouter