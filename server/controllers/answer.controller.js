const Question = require('../models/question')
const Answer = require('../models/answer')

class Controller {
  static async postAnswer(req, res, next) {
    let user = req.user
    let { title, description, question:questionId } = req.body
    try {
      let question = await Answer.create({ title, description, user, question: questionId })
      res.status(201).json(question)
    } catch (err) {
      console.log('post question error', { err })
      next(err)
    }
  }
}

module.exports = Controller