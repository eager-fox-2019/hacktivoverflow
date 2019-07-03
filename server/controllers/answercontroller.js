const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
  static getAnswers(req,res,next) {
    Answer.find({
      // question: 
    })
  }

  static addAnswer(req,res,next) {
    const { title, description, questionId } = req.body 

    Answer.create({
      user: req.decode.id,
      title: title,
      description: description,
      upvotes: 0,
      downvotes: 0,
      question: questionId
    })
      .then(answer => {
        res.status(201).json(answer)
      })
      .catch(next)
  }

  static editAnswer(req,res,next) {
    const { title, description, question}
  }

  static deleteAnswer(req,res,next) {
    Answer.deleteOne({
      _id: req.params.id
    })
      .then(deleted => {
        res.status(200).json(deleted)
      })
      .catch(next)
  }
}

module.exports = AnswerController