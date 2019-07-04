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

  static async vote(req, res, next) {
    let { id, action } = req.params
    let user = req.user
    try {
      let answer = await Answer.findOne({ _id: id }).exec()
      let indexUpvoted = answer.upvotes.findIndex(q => q == user)
      let indexDownvoted = answer.downvotes.findIndex(q => q == user)
      if (indexDownvoted !== -1) {
        answer.downvotes.splice(indexDownvoted, 1)
      }
      if (indexUpvoted !== -1) {
        answer.upvotes.splice(indexUpvoted, 1)
      }
      switch (action) {
        case 'upvote':
          answer.upvotes.push(user)
          break
        case 'downvote':
          answer.downvotes.push(user)
          break
        default:
          break
      }
      await answer.save()
      res.json(answer)
    } catch (err) {
      next(err)
    }
  }

  static async updateAnswer(req, res, next) {
    let { id } = req.params
    let { title, description } = req.body
    try {
      let answer = await Answer.findOne({ _id: id }).exec()
      if (title) answer.title = title
      if (description) answer.description = description
      await answer.save()
      res.json(answer)
    } catch (err) {
      next(err)
    }
  }

  static async getAnswerDetail(req, res, next) {
    let { id } = req.params
    try {
      let answer = await Answer.find({ question: id }).populate('user').exec()
      res.json(answer)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller