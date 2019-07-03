const Answer = require('../models/answers')

class ControllerAnswer {
  static findAll(req, res, next) {
    Answer.find()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static create(req, res, next) {
    let {content} = req.body
    let input = {content}
    input.question = req.params.id

    Answer.create(input)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static update(req, res, next) {
    let {content} = req.body
    let input = {content}

    Answer.update({id: ObjectId(req.params.id)}, input)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static findOne(req, res, next) {
    Answer.findById(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }
  
  static delete(req, res, next) {
    Answer.deleteOne(req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static detail(req, res, next) {
    Answer.findById(req.params.id)
    .populate({
      path: 'user'
    })
    .exec(function (err, answer) {
      if (err) {
        next({
          code: 500,
          message: err.message
        })
      } else {
        if (answer) {
          res.status(200).json(answer)
        } else {
          next({
            code: 404,
            message: `Answer with id ${req.params.id} not found!`
          })
        }
      }
    })
  }
}

module.exports = ControllerAnswer