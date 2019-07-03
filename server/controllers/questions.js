const Question = require('../models/questions')

class ControllerQuestion {
  static findAll(req, res, next) {
    Question.find()
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

    Question.update({id: ObjectId(req.params.id)}, input)
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
    Question.deleteOne(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }
}

module.exports = ControllerQuestion