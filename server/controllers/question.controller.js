const Question = require('../models/question')
const Answer = require('../models/answer')

class Controller {
  static async postQuestion (req, res, next) {
      let user = req.user
      let { title, description } = req.body
      try {
        let question = await Question.create({title, description, user})
        res.status(201).json(question)
      } catch (err) {
        console.log('post question error',  {err})
        next(err)
      }
  }

  static async getQuestion (req, res, next) {
    try {
      let questions = await Question.find({}).populate('user').exec()
      res.json(questions)
    } catch (err) {
      console.log('get question error', { err })
      next(err)
    }
  }

  static async getQuestionDetail (req, res, next) {
    let { id } = req.params 
    try {
      let questionPromise = Question.findOne({ _id: id }).populate('user').exec()
      let answerPromise = Answer.find({ question: id }).populate('question').exec()
      let [question, answers] = await Promise.all([questionPromise, answerPromise])
      // kalau langsung di spread nanti variabel mongo kebawa juga
      res.json({
        _id: question._id,
        user: question.user,
        title: question.title,
        description: question.description,
        upvotes: question.upvotes,
        downvotes: question.downvotes, 
        answers
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller