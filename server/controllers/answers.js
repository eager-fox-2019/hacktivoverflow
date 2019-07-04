const Answer = require('../models/answers')

class ControllerAnswer {
  static findAll(req, res, next) {
    Answer.find({question: req.params.id})
    .populate('user')
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static create(req, res, next) {
    let {content} = req.body
    let input = {content}
    input.user = req.user.id
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

    Answer.updateOne({_id: req.params.id}, input)
    .then(result => {
      console.log('result', result)
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
    Answer.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }

  static updateVote(req, res, next) {
    Answer.findOne({_id: req.params.id})
    .then(data => {
      if(data) {
        data.upvote = req.body.upvote
        data.downvote = req.body.downvote
        return data.save()
      } else {
        throw {status: 400, message: 'Answer not found'}
      }
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
  }
}

module.exports = ControllerAnswer