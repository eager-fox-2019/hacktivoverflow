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
    // returns question object
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
    .populate('owner')
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
    let vote = req.params.vote
    let validVotes = ['up', 'down', 'reset']
    if (!validVotes.includes(vote)) throw ({message: 'invalid vote. only vote up, down, or reset'})
      
    let questionId = req.params.id
    let userId = req.decode.id
    let updatedQuestion

    Question.findOne({_id: questionId})
    .then (foundQuestion => {
      if (!foundQuestion) throw ({message: 'selected question not found'})
      
      // check if user has voted before, if user has, remove the old vote
      let upIndex = foundQuestion.upvotes.indexOf(userId)
      let downIndex = foundQuestion.downvotes.indexOf(userId)
      if (upIndex > -1) {
        foundQuestion.upvotes.splice(upIndex, 1) 
        // reset vote
        vote = 'reset'
      }
      if (downIndex > -1) {
        foundQuestion.downvotes.splice(downIndex, 1)
        vote = 'reset'
      }

      // add the user's new vote
      if (vote === 'up'){
        foundQuestion.upvotes.push(userId)
      } else if (vote === 'down'){
        foundQuestion.downvotes.push(userId)
      } else if (vote === 'reset'){
        // user removed their vote and does not add a new one
      } else {
        throw ({message: 'invalid vote. only vote up, down, or reset'})
      }

      // finally, update the question
      updatedQuestion = foundQuestion
      return Question.update({_id: foundQuestion._id}, foundQuestion, {new: true})
    })
    .then ( result => {
      res.json(updatedQuestion)
    })
    .catch(next)
  }
}

module.exports = ControllerQuestion