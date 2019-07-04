const Answer = require('../models/answerModel')

class AnswerController{
    static create(req, res, next) {
        let { title, description, questionId, author } = req.body
        Answer.create({
            title, description, questionId, author
        })
            .then((newAnswer) => {
                res.status(201).json(newAnswer)
            })
            .catch(next)
    }

    static read(req, res, next) {
        Answer.find({})
        .then((answers) => {
            res.status(200).json(answers)
        })
        .catch(next)
    }

    static update(req, res, next) {
        let id = req.params.answerId
        let dataUpdate = req.body
        Todo.findByIdAndUpdate(id, dataUpdate, { new: true })
            .then((updated) => {
                res.status(200).json(updated)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        let id = req.params.answerId
        Todo.findByIdAndDelete(id)
            .then((deleted) => {
                res.status(200).json(deleted)
            })
            .catch(next)
    }
}

module.exports = AnswerController