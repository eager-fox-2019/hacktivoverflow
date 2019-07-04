const Questions = require('../models/question')

class QuestionControllers {
  static create(req, res, next) {
    req.body.userId = req.decode._id

    Questions.create(req.body)
    .then(question => {
      return question.populate('userId').execPopulate()
    })
    .then(result => res.status(201).json(result))
    .catch(next)
  }

  static listAll(req, res, next) {
    Questions.find()
    .populate({
      path: 'answers',
      populate: {
        path: 'userId'
      }
    })
    .populate('userId')
    .exec(function (err, question) {
      if (err) next(err)
      res.json(question)
    })
  }

  static upvote(req, res, next) {
    let q
    Questions.findById(req.params.qid)
    .then(question => {
      if (!question) throw { code: 404 }

      if (question.downvotes.includes(req.decode._id)) question.downvotes.pull(req.decode._id)
      else if (!question.upvotes.includes(req.decode._id)) question.upvotes.push(req.decode._id)
      else throw { code: 400, message: 'You already voted for this question'}

      q = question
      question.save()
    })
    .then(() => res.json({ _id: q._id, userId: req.decode._id }))
    .catch(next)
  }

  static downvote(req, res, next) {
    let q
    Questions.findById(req.params.qid)
    .then(question => {
      if (!question) throw { code:404 }

      if (question.upvotes.includes(req.decode._id)) question.upvotes.pull(req.decode._id)
      else if (!question.downvotes.includes(req.decode._id)) question.downvotes.push(req.decode._id)
      else throw { code: 400, message: 'You already voted for this question'}

      q = question
      question.save()
    })
    .then(() => res.json({ _id: q._id, userId: req.decode._id }))
    .catch(next)
  }

  static delete(req, res, next) {
    Questions.findById(req.params.qid)
    .then(question => {
      if (!question) throw { code: 404 }
      if (question.userId.toString() !== req.decode._id) throw { code: 401 }

      return Questions.deleteOne({ _id: req.params.qid })
    })
    .then(() => res.json({ message: 'success delete' }))
    .catch(next)
  }
}

module.exports = QuestionControllers