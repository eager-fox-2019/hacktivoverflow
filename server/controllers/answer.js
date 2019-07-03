const Answers = require('../models/answer')
const Questions = require('../models/question')

class AnswerControllers {
  static create(req, res, next) {
    let q
    Questions.findById(req.params.qid)
    .then(question => {
      if (!question) throw { code: 404 }

      q = question
      req.body.userId = req.decode._id
      return Answers.create(req.body)
    })
    .then(answer => {
      q.answers.push(answer._id)
      res.status(201).json(answer)
      q.save()
    })
    .catch(next)
  }

  static listById(req, res, next) {
    Answers.findById(req.params.aid)
    .then(answer => {
      if (!answer) throw { code: 404 }

      res.json(answer)
    })
    .catch(next)
  }

  static upvote(req, res, next) {
    let a
    Answers.findById(req.params.aid)
    .then(answer => {
      if (!answer) throw { code: 404 }

      if (answer.downvotes.includes(req.decode._id)) answer.downvotes.pull(req.decode._id)
      else if (!answer.upvotes.includes(req.decode._id)) answer.upvotes.push(req.decode._id)
      else throw { code: 400, message: 'You already voted for this answer'}

      a = answer
      answer.save()
    })
    .then(() => res.json({ _id: a._id, userId: req.decode._id }))
    .catch(next)
  }

  static downvote(req, res, next) {
    let a
    Answers.findById(req.params.aid)
    .then(answer => {
      if (!answer) throw { code:404 }

      if (answer.upvotes.includes(req.decode._id)) answer.upvotes.pull(req.decode._id)
      else if (!answer.downvotes.includes(req.decode._id)) answer.downvotes.push(req.decode._id)
      else throw { code: 404, message: 'You already voted for this answer'}

      a = answer
      answer.save()
    })
    .then(() => res.json({ _id: a._id, userId: req.decode._id }))
    .catch(next)
  }

}
module.exports = AnswerControllers