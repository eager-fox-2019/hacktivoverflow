const { Question } = require('../models')
const axios = require('axios')

class ControllerQuestion {
    static create(req, res, next) {
      let { title, description , tags} = req.body
      let userId = req.user._id
      let input = {  title, description, userId, tags }
      Question.create(input)
        .then(data => {
          res.status(201).json(data)
        })
        .catch(next)
    }
    static findAll(req, res, next) {
      Question.find().sort([[ 'createdAt', -1 ]])
        .then(data => {
          res.status(200).json(data)
        })
        .catch(next)
    }
    static findByTag(req, res, next) {
      let input = req.body
      Question.find({ 'tags.text': { $in: input} }).sort([[ 'createdAt', -1 ]])
        .then(data => {
          res.status(200).json(data)
        })
        .catch(next)
    }
    static findOne(req, res, next) {
      Question.findOne({_id: req.params.id}).populate('answers')
        .then(question => {
          res.status(200).json(question)
        })
        .catch(next)
    }
    static update(req, res, next) {
      
      let { title, description, downVotes, upVotes, tags, answers } = req.body
      let input = { title, description, downVotes, upVotes, tags, answers }
      Question.findOneAndUpdate({_id: req.params.id}, input, { new: true })
        .then(question => {
          res.status(200).json(question)
        })
        .catch(next)
    }
    static delete(req, res, next) {
      Question.findOneAndDelete({_id: req.params.id})
        .then(() => {
          res.status(200).json({ message: 'Delete successfully' })
        })
        .catch(next)
    }
    static upVote (req, res, next) {
      let questionId = req.params.id
      let voter = req.user._id
      Question.findOne({_id : questionId})
      .then(data =>{
          if(data.upVotes.includes(voter)){
            return Question.findOneAndUpdate({_id: questionId}, {$pull: {upVotes: voter}}, {new : true})
          }else if (data.downVotes.includes(voter)){
            return Question.findOneAndUpdate({_id: questionId}, {$pull: {downVotes: voter}}, {new : true})
              .then(data =>{
                return Question.findOneAndUpdate({_id: questionId}, {$push: {upVotes: voter}}, {new : true})
              })
          }
          else {
            return Question.findOneAndUpdate({_id: questionId}, {$push: {upVotes: voter}}, {new : true})
          }
      })
      .then(data =>{
          res.status(201).json(data)
      })
      .catch(next)
    }
    static downVote (req, res, next) {
      let questionId = req.params.id
      let voter = req.user._id
      Question.findOne({_id : questionId})
      .then(data =>{
          if(data.downVotes.includes(voter)){
              return Question.findOneAndUpdate({_id : questionId},{$pull: {downVotes: voter}}, {new : true})
          }else if (data.upVotes.includes(voter)){
            return Question.findOneAndUpdate({_id : questionId},{$pull: {upVotes: voter}}, {new : true}) 
              .then(data =>{
                return Question.findOneAndUpdate({_id : questionId},{$push: {downVotes: voter}}, {new : true}) 
              })
          }else {
            return Question.findOneAndUpdate({_id : questionId},{$push: {downVotes: voter}}, {new : true})                 
          }
          
      })
      .then(data =>{
          res.status(201).json(data)
      })
      .catch(next)
    }
}

module.exports = ControllerQuestion