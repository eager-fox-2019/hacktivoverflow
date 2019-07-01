const Question = require('../models/model-question')

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
      .then((questions) => {
        res.json(questions)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    Question.findById(req.params.id)
      .populate('user_id', 'full_name email username _id')
      .then((question) => {
        res.json(question)
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
    Question.findByIdAndDelete(id)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch(next)
  }  
}

module.exports = ControllerQuestion