const Question = require('../models/question')
const Answer = require('../models/answer')

function authorizeQuestion(req, res, next) {
  if(!req.body.voteType){
    Question.findById(req.params._id)
      .then(row => {
        if (row) {
          if (row.user.equals(req.decoded._id))
            next()
          else
            next({ code: 401, message: 'Unauthorized' })
        }
        else
          next({ code: 404, message: 'Question not found' })
      })
      .catch(next)
  }
  else
    next()
}

function authorizeAnswer(req, res, next) {
  if(!req.body.voteType){
    Answer.findById(req.params._id)
      .then(row => {
        if (row) {
          if (row.user.equals(req.decoded._id))
            next()
          else
            next({ code: 401, message: 'Unauthorized' })
        }
        else
          next({ code: 404, message: 'Answer not found' })
      })
      .catch(next)
  }
  else
    next()
}

module.exports = {
  authorizeQuestion,
  authorizeAnswer
}