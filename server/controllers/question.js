const Question = require('../models/question')
const Answer = require('../models/answer')

class Controller {
    static findAll(req, res, next) {
        Question
            .find({})
            .populate('answers')
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        Question
            .findById(req.params.id)
            .populate('answers')
            .then(resp => {
                res.status(200).json(resp)
            })
    }

    static create(req, res, next) {
        let data = {
            userId: req.decoded.id,
            title: req.body.title,
            desc: req.body.desc,
            upvotes: [],
            downvotes: [],
            answers: []
        }

        Question
            .create(data)
            .then(resp => {
                res.status(201).json(resp)
            })
            .catch(next)
    }

    static patch(req, res, next) {
        let data = {}

        req.body.title && (data.title = req.body.title)
        req.body.desc && (data.desc = req.body.desc)

        Question
            .findByIdAndUpdate(req.params.id, data, {
                new: true
            })
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Answer
            .deleteMany({
                questionId: req.params.id
            })
            .then(resp => {
                return Question
                    .findByIdAndDelete(req.params.id)
            })
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(next)
    }

    static upvotes(req, res, next) {
        let data = {
            $push: {
                upvotes: req.decoded.id
            }
        }

        Question
            .findById(req.params.id)
            .then(resp => {
                if (resp.upvotes.indexOf(req.decoded.id) !== -1 || resp.downvotes.indexOf(req.decoded.id) !== -1) {
                    throw ({
                        status: 400,
                        message: 'You already vote'
                    })
                } else {
                    return Question
                        .findOneAndUpdate({
                            _id: req.params.id
                        }, data, {
                            new: true
                        })
                }
            })
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(next)
    }

    static downvotes(req, res, next) {
        let data = {
            $push: {
                downvotes: req.decoded.id
            }
        }

        Question
            .findById(req.params.id)
            .then(resp => {
                if (resp.downvotes.indexOf(req.decoded.id) !== -1 || resp.upvotes.indexOf(req.decoded.id) !== -1) {
                    throw ({
                        status: 400,
                        message: 'You already vote'
                    })
                } else {
                    return Question
                        .findOneAndUpdate({
                            _id: req.params.id
                        }, data, {
                            new: true
                        })
                }
            })
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(next)
    }
}

module.exports = Controller