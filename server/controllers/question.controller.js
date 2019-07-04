const Question = require('../models/question')

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
}

module.exports = Controller