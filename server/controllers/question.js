const Question = require('../models/question')
const User = require('../models/user')

class QuestionController {
  static create(req, res, next) {
    let obj = {}
    let exclude = ['user', 'upvotes', 'downvotes', '_id', '__v', 'createdAt', 'updatedAt']

    Question.schema.eachPath(path => {
      if (!exclude.includes(path)) {
        if (req.body[path])
          obj[path] = req.body[path]
      }
    })
    obj.user = req.decoded._id
    let result

    Question.create(obj)
      .then(row => {
        result = row
        return User.findByIdAndUpdate(req.decoded._id, {
          $inc: { reputation: 30 }
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
    let exclude = ['tags', 'user', 'upvotes', 'downvotes', '_id', '__v', 'createdAt', 'updatedAt']
    Question.schema.eachPath(path => {
      if (!exclude.includes(path)) {
        if (req.query[path])
          obj[path] = { '$regex': req.query[path], '$options': 'i' }
      }
    })
    if (req.params.userId)
      obj.user = req.params.userId
    if (req.query.tags)
      obj.tags = { $in: req.query.tags }

    console.log(obj);

    Question.find(obj)
      .populate('user')
      // .populate('answeredBy')
      .then(rows => {

        res.json(rows)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    Question.findById(req.params._id)
      .populate('user')
      // .populate('answeredBy')
      .then(row => {
        console.log('==============>>>>>');
        console.log(row);

        res.json(row)
      })
      .catch(next)
  }
  static update(req, res, next) {
    Question.findById(req.params._id)
      .then(row => {
        console.log('-------------------');

        console.log(req.body);
        console.log(req.params._id);

        let exclude = ['user', 'upvotes', 'downvotes', '_id', '__v', 'createdAt', 'updatedAt']
        if (req.body.tags && typeof req.body.tags == 'string')
          req.body.tags = req.body.tags.split(',')

        if (req.method === "PATCH") {
          Question.schema.eachPath(path => {
            if (!exclude.includes(path)) {
              if (req.body[path])
                row[path] = req.body[path]
            }
          })
        }
        else {
          Question.schema.eachPath(path => {
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
        else if (req.body.voteType == 'downvote') {
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
    let result
    Question.findByIdAndDelete(req.params._id)
      .populate('user')
      // .populate('answeredBy')
      .then(row => {
        return User.findByIdAndUpdate(req.decoded._id, {
          $inc: { reputation: -30 }
        }, { new: true })

      })
      .then(row => {
        res.json(result)
      })
      .catch(next)
  }
}

module.exports = QuestionController