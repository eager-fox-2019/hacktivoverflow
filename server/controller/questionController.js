const Question = require('../models/question')


class questionController {
    static getAllQuestion(req, res, next) {
        Question
            .find()
            .populate('creator')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }
    static getOneQuestion(req, res, next) {
        let questionId = req.params.id
        Question
            .findById(questionId)
            .populate('creator')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }
    static getUsersQuestion(req, res, next) {
        let id = req.decoded._id
        Question
            .findOne({ creator: ObjectId(id) })
            .populate('creator')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)

    }
    static createQuestion(req, res, next) {
        console.log(req.body)
        let id = req.decoded._id
        let {
            title,
            description,
            tags
        } = req.body
        Question
            .create({
                title,
                description,
                tags,
                createdAt: new Date(),
                creator: id
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)

    }
    static deleteQuestion(req, res, next) {
        let questionId = req.params.id
        Question
            .findByIdAndRemove(questionId/*id*/)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(next)

    }
    static updateQuestion(req, res, next) {
        let questionId = req.params.id
        Question
            .findById(questionId)
            .populate('creator')
            .then(question => {
                question.set(req.body)
                return question.save()
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(next)

    }
    static upvote(req, res, next) {
        let id = req.decoded._id
        let questionId = req.params.id
        Question
            .findById(questionId)
            .then(question => {
                if (question.downvotes.includes(id)) {
                    return Question
                        .findByIdAndUpdate(questionId,
                            {
                                $pull:
                                    { downvotes: id }
                            },
                            { new: true }
                        )
                } else if (question.upvotes.includes(id)) {
                    return Question
                        .findByIdAndUpdate(questionId,
                            {
                                $pull:
                                    { upvotes: id }
                            },
                            { new: true }
                        )
                } else {
                    return question
                }
            })
            .then(question => {
                question.upvotes.push(id)
                return question.save()
            })
            .then(question => {
                return Question.populate(question, { path: 'creator' })
            })
            .then(upvotedQuestion => {
                res.status(200).json(upvotedQuestion)
            })
            .catch(next)

    }
    static downvote(req, res, next) {
        let id = req.decoded._id
        let questionId = req.params.id
        Question
            .findById(questionId)
            .populate('creator')
            .then(question => {
                if (question.upvotes.includes(id)) {
                    return Question
                        .findByIdAndUpdate(questionId,
                            {
                                $pull:
                                    { upvotes: id }
                            },
                            { new: true }
                        )
                } else if (question.downvotes.includes(id)) {
                    return Question
                        .findByIdAndUpdate(questionId,
                            {
                                $pull:
                                    { downvotes: id }
                            },
                            { new: true }
                        )
                } else {
                    return question
                }
            })
            .then(question => {
                question.downvotes.push(id)
                return question.save()
            })
            .then(question => {
                return Question.populate(question, { path: 'creator' })
            })
            .then(downvotedQuestion => {
                res.status(200).json(downvotedQuestion)
            })
            .catch(next)
    }
    static removeUporDown(req, res, next) {
        let id = req.decoded._id
        let questionId = req.params.id
        Question
            .findByIdAndUpdate(questionId,
                {
                    $pull:
                    {
                        upvotes: id,
                        downvotes: id
                    }
                },
                { new: true }
            )
            .populate('creator')
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(next)

    }
}
module.exports = questionController