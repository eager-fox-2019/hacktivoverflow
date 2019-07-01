const Models = require('../models/')
const { User, Question, Answer } = Models

class ControllerQuestion {
  static edit(req, res, next){
    let questionId = req.params.id
    let userId = req.decode.id

    let updatedValues = {}
    if(req.body.title) updatedValues.title = req.body.title
    if(req.body.description) updatedValues.description = req.body.description

    Question.findOneAndUpdate({_id: questionId, owner
      : userId}, updatedValues, {new: true})
    .then( result => {
      res.json(result)
    })
    .catch(next)
  }

  static findOne(req, res, next){
    // returns question object with attached answerList
    let questionId = req.params.id
    Question.findOne({_id: questionId})
    .then (found => {
      if (!found) throw ({message: 'question not found', status: 404})
      res.json(found) 
    })
    .catch(next)
  }

  static findAll(req, res, next){
    Question.find()
    .then (found => {
      res.json(found)
    })
    .catch(next)
  }

  static create(req, res, next) {
    let {title, description} = req.body
    let owner = req.decode.id
    let input = {title, description, owner}

    Question.create(input)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next)
  }

  static delete(req, res, next) {
    let owner = req.decode.id
    let questionId = req.params.id
    let deleted = {}
    Question.findOneAndDelete({_id: questionId, owner: owner})
    .then(result => {
      // returns the question deleted
      deleted.question = result
      return Answer.find({owner: questionId})
    })
    .then(answerList => {
      deleted.answerList = answerList
      answerList.forEach(answer => {
        Answer.delete({_id: answer._id})
        // deletes all corresponding answers when a question is deleted
      })
      res.json(deleted)
    })
    .catch(next)
  }

  static vote(req, res, next) {

  }
}

module.exports = ControllerQuestion