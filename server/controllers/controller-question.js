const Question = require('../models/model-question')
const Answer = require('../models/model-answer')

class ControllerQuestion {
  static create(req, res, next) {
    let newQuestion = {
      title: req.body.title,
      content: req.body.content,
      user_id: req.userId
    }
    Question.create(newQuestion)
      .then((createdQuestion) => {
        res.json(createdQuestion)
      })
      .catch(next)
  }

  static readAllwFilter(req, res, next) {
    let schemaField = Object.keys(Question.prototype.schema.paths)
    let filteredField = Object.keys(req.body).filter((x) => schemaField.indexOf(x) > -1)
    let query = filteredField.reduce((acc, el) => Object.assign(acc, {[el]: req.body[el]}), {})

    Question.find(query)
      .populate('user_id', 'full_name email username _id')
      .populate('answers')
      .then((questions) => {
        res.status(200).json(questions)
      })
      .catch(next)
  }

  static readAllOneUser(req, res, next) {
    Question.find({ user_id: req.params.userid})
      .populate('user_id')
      .then((question) => {
        res.status(200).send(question)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    Question.findById(req.params.id)
      .populate({
        path: 'user_id',
        select: 'username full_name _id'
      })
      .populate({
        path: 'answers',
        model: 'Answer',
        populate: {
          path: 'user_id',
          model: 'User',
        select: 'username full_name _id'
        }
      })
      .then((question) => {
        res.status(200).json(question)
      })
      .catch(next)
  }
  
  static update(req, res, next) {
    let schemaField = Object.keys(Question.prototype.schema.paths)
    let filteredField = Object.keys(req.body).filter((x) => schemaField.indexOf(x) > -1)
    let updatedQuestion = filteredField.reduce((acc, el) => Object.assign(acc, {[el]: req.body[el]}), {})
    Question.findByIdAndUpdate(req.params.id, updatedQuestion, { new: true })
      .then((question) => {
        res.status(201).json(question)
      })
      .catch(next)
  }
  
  static delete(req, res, next) {
    let id = req.params.id
    let promAnswer = Answer.deleteMany({ question_id: id })
    let promQuestion = Question.deleteOne({ _id: id })
    Promise.all([promAnswer, promQuestion])
      .then((values) => {
        res.status(201).json(values)
      })
      .catch(next)
  }

  static vote(req, res, next) {
    Question.findById(req.params.id)
      .then((question) => {
        if (!question) throw { code: 404, message: 'Question not found' }
        else {
          let indexUpVote = question.upvotes.findIndex(el => el._id == req.userId)
          let indexDownVote = question.downvotes.findIndex(el => el._id == req.userId)
          let endPath = req.path.split('/')          
          let voteType = (endPath[endPath.length - 1] === 'upvote') ? 'upvote' : 'downvote'
          if ((indexDownVote > -1 && voteType == 'downvote') 
            || (indexUpVote > -1 && voteType == 'upvote')) {
            throw { code: 400, message: `You've ${voteType} this answer`}
          } else {
            if (indexDownVote > -1) {
              question.downvotes.splice(indexDownVote, 1)
              question.upvotes.push(req.userId)
            } else if (indexUpVote > -1) {
              question.upvotes.splice(indexUpVote, 1)
              question.downvotes.push(req.userId)
            } else {
              console.log('belum pernah vote')
              if (voteType === 'upvote') {
                question.upvotes.push(req.userId)
              } else if (voteType === 'downvote') {
                question.downvotes.push(req.userId)
              }
            }
            return question.save()
          }
        }
      })
      .then((question) => {
        res.status(201).json(question)
      })
      .catch(next)
  }
}

module.exports = ControllerQuestion