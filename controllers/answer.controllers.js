const Models = require('../models/')
const { User, Question, Answer } = Models

class ControllerAnswer {
  static edit(req, res, next){
    let answerId = req.params.id
    let userId = req.decode.id

    let updatedValues = {}
    if(req.body.title) updatedValues.title = req.body.title
    if(req.body.description) updatedValues.description = req.body.description

    Answer.findOneAndUpdate({_id: answerId, owner
      : userId}, updatedValues, {new: true})
    .then( result => {
      res.json(result)
    })
    .catch(next)
  }

  static findOne(req, res, next){
    // returns answer object
    let answerId = req.params.id
    Answer.findOne({_id: answerId})
    .then (found => {
      if (!found) throw ({message: 'answer not found', status: 404})
      res.json(found) 
    })
    .catch(next)
  }

  static findAll(req, res, next){
    //returns all answers associated with a question
    let questionId = req.params.questionId
    Answer.find({question: questionId})
    .then (found => {
      res.json(found)
    })
    .catch(next)
  }

  static create(req, res, next) {
    let {title, description, question} = req.body
    let owner = req.decode.id
    let input = {title, description, question, owner}

    Question.findOne({_id: question})
    .then( found => {
      if (!found) throw ({message: "question not found"})
      return Answer.create(input)
    })
    .then(result => {
      res.status(201).json(result)
    })
    .catch(next)
  }

  static delete(req, res, next) {
    let owner = req.decode.id
    let answerId = req.params.id
    let deleted = {}
    Answer.findOneAndDelete({_id: answerId, owner: owner})
    .then(result => {
      // returns the answer deleted
      res.json(result)
    })
    .catch(next)
  }

  static vote(req, res, next) {
    let vote = req.params.vote
    let validVotes = ['up', 'down', 'reset']
    if (!validVotes.includes(vote)) throw ({message: 'invalid vote. only vote up, down, or reset'})
      
    let answerId = req.params.id
    let userId = req.decode.id
    let updatedAnswer

    Answer.findOne({_id: answerId})
    .then (found => {
      if (!found) throw ({message: 'selected answer not found'})
      
      // check if user has voted before, if user has, remove the old vote
      let upIndex = found.upvotes.indexOf(userId)
      let downIndex = found.downvotes.indexOf(userId)
      if (upIndex > -1) found.upvotes.splice(upIndex, 1) 
      if (downIndex > -1) found.downvotes.splice(downIndex, 1) 

      // add the user's new vote
      if (vote === 'up'){
        found.upvotes.push(userId)
      } else if (vote === 'down'){
        found.downvotes.push(userId)
      } else if (vote === 'reset'){
        // user removed their vote and does not add a new one
      } else {
        throw ({message: 'invalid vote. only vote up, down, or reset'})
      }

      res.json(found)
    })
    .catch(next)
  }
}

module.exports = ControllerAnswer