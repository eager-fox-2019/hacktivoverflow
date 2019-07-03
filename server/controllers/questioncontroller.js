const Question = require('../models/question')

class QuestionController {
  static getPublicQuestions(req,res,next) {
    Question.find()
      .populate('answers')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static addQuestion(req,res,next) {
    const { title, description } = req.body

    Question.create({
      user: req.decode.id,
      title: title,
      description: description,
      upvotes: 0,
      downvotes: 0,
      answers: []
    })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }

  static editQuestion(req,res,next) {
    const { title, description }  = req.body

    Question.findOne({
      _id: req.params.id,
      user:req.decode.id
    })
      .then(question => {
        question.title = title
        question.description = description
        return question.save()
      })
      .then(edited => {
        res.status(200).json(edited)
      })
      .catch(next)
  }

  static deleteQuestion(req,res,next) {

    Question.deleteOne({
      _id: req.params.id
    })
      .then(deleted => {
        res.status(200).json(deleted)
      })
      .catch(next)
  }


}

module.exports = QuestionController