const Answer = require('../models/answer')
const Question = require('../models/question')
const User = require('../models/user')

class AnswerController {
  static create(req, res, next) {
    let obj = {}
    let exclude = ['user','upvotes', 'downvotes', '_id', '__v', 'createdAt', 'updatedAt']

    Answer.schema.eachPath(path => {
      if (!exclude.includes(path)) {
        if (req.body[path])
          obj[path] = req.body[path]
      }
    })
    obj.question = req.params.questionId,
      obj.user = req.decoded._id

    let result
    Answer.create(obj)
      .then(row =>{
      result = row
      return User.findByIdAndUpdate(req.decoded._id, {
          $inc: { reputation: 50 }
        }, { new: true })
      })
      .then(row => {
        res.status(201).json(result)
      })
      .catch(next)
  }

  static readAll(req, res, next) {
    console.log(req.query);

    let obj = {}
    Answer.schema.eachPath(path => {
      if (!exclude.includes(path)) {
        if (req.query[path])
          obj[path] = { '$regex': req.query[path], '$options': 'i' }
      }
    })

    Answer.find(obj)
      .populate('user')
      .populate('question')
      .then(rows => {
        res.json(rows)
      })
      .catch(next)
  }

  static readByQuestion(req, res, next) {
    Answer.find({ question: req.params.questionId })
    .populate('user')
    .populate('question')
    .then(rows => {
        res.json(rows)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    Answer.findById(req.params._id)
    .populate('user')
      .populate('question')
      .then(row => {
        res.json(row)
      })
      .catch(next)
  }

  static update(req, res, next) {
    Answer.findById(req.params._id)
    .populate('user')
      .populate('question')
      .then(row => {
        let exclude = ['user','upvotes', 'downvotes', '_id', '__v', 'createdAt', 'updatedAt']
        if (req.body.tags && typeof req.body.tags == 'string')
          req.body.tags = req.body.tags.split(',')
        console.log(req.body);
        
        if (req.method === "PATCH") {
          Answer.schema.eachPath(path => {
            if (!exclude.includes(path)) {
              if (req.body[path])
                row[path] = req.body[path]
            }
          })
        }
        else {
          Answer.schema.eachPath(path => {
            if (!exclude.includes(path)) {
              row[path] = req.body[path]
            }
          })
        }

        let foundUpvotes = row.upvotes.filter(userId => userId.equals(req.decoded._id))
        let foundDownvotes = row.downvotes.filter(userId => userId.equals(req.decoded._id))

        if (req.body.voteType == 'upvote') {
          if (foundUpvotes.length > 0)
            next({ code: 400, message: "User already voted" })
          else {
            if (foundDownvotes.length > 0)
              row.downvotes = row.downvotes.filter(userId => !userId.equals(req.decoded._id))
            row.upvotes.push(req.decoded._id)
          }
        }
        else if(req.body.voteType == 'downvote') {
          if (foundDownvotes.length > 0)
            next({ code: 400, message: "User already voted" })
          else {
            if (foundUpvotes.length > 0)
              row.upvotes = row.upvotes.filter(userId => !userId.equals(req.decoded._id))
            row.downvotes.push(req.decoded._id)
          }
        }
        
        let array = []
        array.push(row.save({ validateBeforeSave: false }))
        if (req.body.voteType && foundUpvotes.length == 0 && foundDownvotes.length == 0) {
          array.push(User.findByIdAndUpdate(req.decoded._id, {
            $inc: { reputation: 5 }
          }, { new: true }))
        }
        return Promise.all(array)
      })
      .then(results => {
        res.json(results[0])
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Answer.findByIdAndDelete(req.params._id)
    .populate('user')
    .populate('question')
    .then(row => {
        res.json(row)
      })
      .catch(next)
  }
}

module.exports = AnswerController