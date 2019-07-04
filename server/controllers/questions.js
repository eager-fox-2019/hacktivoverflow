const Question = require('../models/questions')

class ControllerQuestion {
  static findAll(req, res, next) {
    Question.find().populate({path: 'user'})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static create(req, res, next) {
    let {title, content} = req.body
    let input = {title, content}
    input.user = req.user.id
    Question.create(input)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static update(req, res, next) {
    let {title, content} = req.body
    let input = {title, content}

    Question.updateOne({_id: req.params.id}, input)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static findOne(req, res, next) {
    Question.findById(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }
  
  static delete(req, res, next) {
    Question.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json(result)
      
    })
    .catch(next)
  }

  static updateVote(req, res, next) {
    Question.findOne({_id: req.params.id})
    .then(data => {
      if(data) {
        data.upvote = req.body.upvote
        data.downvote = req.body.downvote
        return data.save()
      } else {
        throw {status: 400, message: 'Question not found'}
      }
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static inputAnswer(req, res, next) {
    Question.findOne({_id: req.params.id})
    .then(data => {
      if(data) {
        data.answer = req.body.answer
        return data.save()
      } else {
        throw {status: 400, message: 'Question not found'}
      }
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }
}

module.exports = ControllerQuestion