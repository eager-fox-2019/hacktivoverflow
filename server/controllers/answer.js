const Answer = require('../models/answer')

class Controller {
    static findAll(req, res, next) {
        Answer
            .find({})
            .populate('userId')
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        Answer
            .findById(req.params.id)
            .populate('userId')
            .then(resp => {
                res.status(200).json(resp)
            })
    }

    static create(req, res, next) {
        let data = {
            userId: req.decoded.id,
            title: req.body.title,
            desc: req.body.desc,
            questionId: req.body.questionId,
            upvotes: [],
            downvotes: []
        }

        Answer
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

        Answer
            .findByIdAndUpdate(req.params.id, data, {
                new: true
            })
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(next)
    }

    // static delete(req, res, next) {
    //     Answer
    //         .findByIdAndDelete(req.params.id)
    //         .then(resp => {
    //             res.status(200).json(resp)
    //         })
    //         .catch(next)
    // }

    static upvotes(req, res, next) {
        let data = {
            $push: {
                upvotes: req.decoded.id
            }
        }

        Answer
            .findById(req.params.id)
            .then(resp => {
                if (resp.upvotes.indexOf(req.decoded.id) == -1 && resp.downvotes.indexOf(req.decoded.id) == -1) {
                    return Answer
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
                    return Answer
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
                    return Answer
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
        Answer
            .findById(req.params.id)
            .then(resp => {
                if (resp.upvotes.indexOf(req.decoded.id) == -1 && resp.downvotes.indexOf(req.decoded.id) == -1) {
                    return Answer
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
                    return Answer
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
                    return Answer
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