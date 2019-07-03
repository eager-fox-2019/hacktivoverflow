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
          let indexVote = question.votes.findIndex(el => el.userId == req.userId)
          let endPath = req.path.split('/')
          let voteType = (endPath[endPath.length - 1] === 'voteup') ? 'voteup' : 'votedown'
          if (indexVote > -1) {
            if (question.votes[indexVote].voteType === voteType) {
              throw { code: 400, message: "You've upvote this answer"}
            } else {
              question.votes[indexVote].voteType = voteType
            }
          } else {
            question.votes.push({
              userId: req.userId,
              voteType
            })
          }
          return question.save()
        }
      })
      .then((question) => {
        res.status(201).json(question)
      })
      .catch(next)
  }
}

module.exports = ControllerQuestion