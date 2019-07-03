const Question = require('../models/question')

class Controller {
  static async postQuestion (req, res, next) {
      let { title, description } = req.body
      try {
        let res = await Question.create({title, description})
        res.status(201).json(res)
      } catch (err) {
        next(err)
      }
  }

  static async getQuestion (req, res, next) {
    try {
      let res = await Question.find({}).exec()
      res.json(res)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller