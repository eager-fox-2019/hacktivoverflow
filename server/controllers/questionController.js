const questionModel = require('../models/questionModel')

class QuestionController {
    static findAll(req, res, next) {
        questionModel
            .find()
            .populate('userId')
            .populate('answers')
            .then((allQuestions) => {
                // console.log(allQuestions)
                res.status(200).json(allQuestions)
            })
            .catch((err) => {
                // console.log(err)
                res.status(500).json({
                    errors: err
                })
            })
    }

    static findOne(req, res, next) {
        let questionId = req.params.questionId
        questionModel
            .findById({
                _id: questionId
            })
            .populate('answers')
            .populate('userId')
            .then((question) => {
                // console.log(question)
                res.status(200).json(question)
            })
            .catch((err) => {
                // console.log(err)
                res.status(500).json({
                    errors: err
                })
            })
    }

    static create(req, res, next) {
        let userId = req.decode._id
        console.log(userId, 'userId')
        let newQuestion = {
            title: req.body.title,
            description: req.body.description,
            upVote: [],
            downVote: [],
            userId: userId,
            answers: [],
            tags: req.body.tags
        }

        questionModel
            .create(newQuestion)
            .then((created) => {
                // console.log(created)
                res.status(201).json(created)
            })
            .catch((err) => {
                // console.log(err)
                res.status(500).json({
                    errors: err
                })
            })
    }

    static update(req, res, next) {
        let update = {
            updatedAt: new Date()
        }
        let questionId = req.params.questionId

        if (req.body.title) {
            update.title = req.body.title
        }
        if (req.body.description) {
            update.description = req.body.description
        }

        questionModel
            .findByIdAndUpdate({
                _id: questionId
            }, update, {
                new: true
            })
            .then((updated) => {
                console.log(updated)
                res.status(200).json(updated)
            })
            .catch((err) => {
                console.log(err)
                res.statu(500).json({
                    err: errors
                })
            })
    }

    static upVote(req, res, next) {
        let id = req.params.questionId
        let userId = req.decode._id

        questionModel
            .findById(id)
            .then((question) => {
                if (question.upVote.indexOf(userId) >= 0) {
                    // console.log(question,'question===============')
                    return questionModel
                        .findByIdAndUpdate(id, {
                            $pull: {
                                upVote: userId
                            }
                        }, {
                            new: true
                        })
                } else if (question.downVote.includes(userId)) {
                    // console.log('ehhhh gamasuuukk')
                    // console.log('ada dibawah')
                    return questionModel
                        .findByIdAndUpdate(id, {
                            $pull: {
                                downVote: userId
                            },
                            $push: {
                                upVote: userId
                            }
                        }, {
                            new: true
                        })

                } else {
                    // console.log('atas bawah gak ada cuyy')
                    return questionModel
                        .findByIdAndUpdate(id, {
                            $push: {
                                upVote: userId
                            }
                        }, {
                            new: true
                        })
                }
            })
            .then((voted) => {
                console.log(voted)
                res.status(200).json(voted)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static downVote(req, res, next) {
        let id = req.params.questionId
        let userId = req.decode._id

        questionModel
            .findById(id)
            .then((question) => {
                if (question.downVote.includes(userId)) {
                    return questionModel
                        .findByIdAndUpdate(id, {
                            $pull: {
                                downVote: userId
                            }
                        }, {
                            new: true
                        })
                } else if (question.upVote.includes(userId)) {
                    return questionModel
                        .findByIdAndUpdate(id, {
                            $pull: {
                                upVote: userId
                            },
                            $push: {
                                downVote: userId
                            }
                        }, {
                            new: true
                        })
                } else {
                    return questionModel
                        .findByIdAndUpdate(id, {
                            $push: {
                                downVote: userId
                            }
                        }, {
                            new: true
                        })
                }
            })
            .then((updated) => {
                console.log(updated)
                res.status(200).json(updated)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    errors: err
                })
            })
    }

    static delete(req, res, next) {
        let id = req.params.questionId

        questionModel
            .findByIdAndDelete({
                _id: id
            })
            .then((success) => {
                // console.log(success)
                res.status(200).json(success)
            })
            .catch((err) => {
                // console.log(err)
                res.status(500).json({
                    errors: err
                })
            })
    }
}

module.exports = QuestionController