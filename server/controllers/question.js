const Question = require('../models/question')
const Answer = require('../models/answer')

class Controller {
    static findAll(req, res, next) {
        Question
            .find({})
            .populate('userId')
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        Question
            .findById(req.params.id)
            .populate({
                path: 'answers',
                populate: {
                    path: 'userId'
                }
            })
            .populate('userId')
            .then(resp => {
                res.status(200).json(resp)
            })
    }

    static findByUser(req, res, next) {
        Question
            .find({
                userId: req.decoded.id
            })
            .populate('userId')
            .then(resp => {
                res.status(200).json(resp)
            })
    }

    static tags(req, res, next) {
        Question
            .find({
                tags: {
                    $in: req.params.tag
                }
            })
            .populate('userId')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static search(req, res, next) {
        Question
            .find({
                title: {
                    '$regex': req.params.input,
                    '$options': 'i'
                }
            })
            .populate('userId')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static create(req, res, next) {
        let data = {
            userId: req.decoded.id,
            title: req.body.title,
            desc: req.body.desc,
            upvotes: [],
            downvotes: [],
            answers: [],
            tags: req.body.tags
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
        req.body.tags && (data.tags = req.body.tags)

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
        Question
            .findById(req.params.id)
            .then(resp => {
                if (resp.upvotes.indexOf(req.decoded.id) == -1 && resp.downvotes.indexOf(req.decoded.id) == -1) {
                    return Question
                        .findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            $push: {
                                upvotes: req.decoded.id
                            }
                        }, {
                            new: true
                        })
                } else if (resp.upvotes.indexOf(req.decoded.id) !== -1 && resp.downvotes.indexOf(req.decoded.id) == -1) {
                    return Question
                        .findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            $pull: {
                                upvotes: req.decoded.id
                            }
                        }, {
                            new: true
                        })
                } else if (resp.upvotes.indexOf(req.decoded.id) == -1 && resp.downvotes.indexOf(req.decoded.id) !== -1) {
                    return Question
                        .findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            $pull: {
                                downvotes: req.decoded.id
                            },
                            $push: {
                                upvotes: req.decoded.id
                            }
                        }, {
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
        Question
            .findById(req.params.id)
            .then(resp => {
                if (resp.upvotes.indexOf(req.decoded.id) == -1 && resp.downvotes.indexOf(req.decoded.id) == -1) {
                    return Question
                        .findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            $push: {
                                downvotes: req.decoded.id
                            }
                        }, {
                            new: true
                        })
                } else if (resp.upvotes.indexOf(req.decoded.id) == -1 && resp.downvotes.indexOf(req.decoded.id) !== -1) {
                    return Question
                        .findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            $pull: {
                                downvotes: req.decoded.id
                            }
                        }, {
                            new: true
                        })
                } else if (resp.upvotes.indexOf(req.decoded.id) !== -1 && resp.downvotes.indexOf(req.decoded.id) == -1) {
                    return Question
                        .findOneAndUpdate({
                            _id: req.params.id
                        }, {
                            $pull: {
                                upvotes: req.decoded.id
                            },
                            $push: {
                                downvotes: req.decoded.id
                            }
                        }, {
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