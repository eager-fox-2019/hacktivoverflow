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

    let answerId;
    Answer.create({
      user: req.decode.id,
      title: title,
      description: description,
      question: questionId
    })
      .then(answer => {
        answerId = answer._id
        // res.status(201).json(answer)
        return Question.findOne({ _id: questionId })
      })
      .then(question => {
        question.answers.push(answerId)
        return question.save()
      })
      .then(edited => {
        return Answer.populate(edited, {path: 'answers', populate: { path: 'user'}})
      })
      .then(pop => {
        res.status(200).json(pop)
      })
      .catch(next)
  }

  static editAnswer(req,res,next) {
    // const { title, description, question}
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