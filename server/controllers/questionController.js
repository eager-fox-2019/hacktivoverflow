const Question = require("../models/Question")
const User = require("../models/User")
const Answer = require("../models/Answer")
const moment = require('moment')

class questionController {

    static async getAllQuestion(req, res, next) {
        Question.find({})
            .populate('author')
            .sort({
                createdAt: -1
            })
            .then(found => {
                res.json(found)
            }).catch(next)
    }

    static async search(req, res, next) {
        let searchTitle = new RegExp(req.query.tags, "i")
        console.log(searchTitle);
        try {
            let byTags = await Question.find({
                tags: searchTitle
            })
            let byTitle = await Question.find({
                title: searchTitle
            })
            res.json([
                byTitle,
                byTags
            ])
        } catch (error) {
            next(error)
        }
    }

    static getOneQuestion(req, res, next) {
        Question.findById(req.params.questionId)
            .populate('author')
            .populate({
                path: 'answers',
                populate: {
                    path: 'author',
                    model: 'User'
                },
                options: {
                    sort: {
                        createdAt: -1
                    }
                }
            })
            .then(found => {
                if (found) {
                    res.json(found)
                } else {
                    throw {
                        code: 404,
                        message: 'Question not found'
                    }
                }
            }).catch(next)
    }

    static async getAllTags(req, res, next) {
        try {
            let questions = await Question.find({})
            let tags = []
            for (let question of questions) {
                for (let tag of question.tags) {
                    if (!tags.includes(tag)) {
                        tags.push(tag)
                    }
                }
            }
            res.json(tags)
        } catch (error) {
            next(error)
        }
    }

    static async askQuestion(req, res, next) {
        let question = new Question({
            author: req.loggedUser._id,
            createdAt: moment().format(),
            title: req.body.title,
            body: req.body.body,
            solved: false,
            upvotes: [],
            downvotes: [],
            answers: [],
            tags: req.body.tags
        })
        req.loggedUser.questions.push(question._id)
        try {
            await question.save()
            res.json(await req.loggedUser.save())
        } catch (error) {
            next(error)
        }
    }

    static async getAllAnswers(req, res, next) {
        try {
            let question = await Question.findById(req.params.questionId)
                .populate({
                    path: 'answers',
                    populate: {
                        path: 'author',
                        model: 'User'
                    }
                })
            res.json(question.answers)
        } catch (error) {
            next(error)
        }
    }

    static async createAnswer(req, res, next) {
        let answer = new Answer({
            createdAt: moment().format(),
            author: req.loggedUser._id,
            upvotes: [],
            downvotes: [],
            title: req.body.title,
            body: req.body.body
        })
        try {
            let question = await Question.findById(req.params.questionId)
            if (question) {
                question.answers.push(answer._id)
                await question.save()
                res.json(await answer.save())
            } else {
                throw {
                    code: 404,
                    message: "question not found"
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async getOneAnswer(req, res, next) {
        try {
            let answer = await Answer.findById(req.params.answerId)
            if (answer) {
                res.json(answer)
            } else {
                throw {
                    code: 404,
                    message: 'Answer not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static editQuestion(req, res, next) {
        Question.findById(req.params.questionId)
            .then(found => {
                if (found) {
                    return found.updateOne({
                        $set: {
                            title: req.body.title,
                            body: req.body.body,
                            tags: req.body.tags
                        }
                    })
                } else {
                    console.log('masuk 404');
                    throw {
                        code: 404,
                        message: 'Question not found'
                    }
                }
            }).then(updated => {
                res.json(updated)
            }).catch(next)
    }

    static async editAnswer(req, res, next) {
        try {
            let answer = await Answer.findByIdAndUpdate(req.params.answerId, {
                $set: {
                    title: req.body.title,
                    body: req.body.body
                }
            }, {
                new: true
            })
            res.json(answer)
        } catch (error) {
            next(error)
        }
    }

    static deleteQuestion(req, res, next) {
        console.log(req.params.questionId, 'masuk ke sini');
        Question.findById(req.params.questionId)
            .then(result => {
                return Promise.all([Answer.deleteMany({
                        "_id": result.answers
                    }),
                    Question.findByIdAndDelete(req.params.questionId)
                ])
            }).then(success => {
                res.json(success)
            }).catch(next)
    }

    static deleteAnswer(req, res, next) {
        Promise.all([Answer.findByIdAndDelete(req.params.answerId),
                Question.updateOne({
                    "_id": req.params.questionId
                }, {
                    $pull: {
                        "answers": req.params.answerId
                    }
                })
            ])
            .then(success => {
                res.json(success)
            }).catch(next)
    }

    static upvoteQuestion(req, res, next) {
        console.log(req.params.questionId);
        Question.findById(req.params.questionId)
            .then(found => {
                if (found) {
                    console.log('question found');
                    console.log('=== CHECKING ===')
                    let checkInDownvotes = found.downvotes.indexOf(req.loggedUser._id)
                    let checkInUpvotes = found.upvotes.indexOf(req.loggedUser._id)
                    if (checkInDownvotes !== -1) { // berarti ketemu
                        console.log('downvotes: exists');
                        found.downvotes.splice(checkInDownvotes, 1)
                        found.upvotes.push(req.loggedUser._id)
                        console.log('status: neutral');
                        return found.save()
                    } else {
                        console.log('downvote: not exist');
                        if (checkInUpvotes === -1) {
                            console.log('upvotes: not exist');
                            found.upvotes.push(req.loggedUser._id)
                            console.log('status: upvoted');
                        } else {
                            found.upvotes.splice(checkInUpvotes, 1)
                        }
                        Question.populate(found, {
                            path: 'author',
                            model: 'User'
                        })
                        return found.populate('author').save()
                    }
                } else {
                    console.log('question not found');
                    console.log('returning 404');
                    throw {
                        code: 404,
                        message: 'Question not found'
                    }
                }
            }).then(success => {
                console.log(success);
                res.json(success)
            }).catch(next)
    }

    static downvoteQuestion(req, res, next) {
        console.log(req.params.questionId);
        Question.findById(req.params.questionId)
            .then(found => {
                if (found) {
                    console.log('question found');
                    console.log('=== CHECKING ===')
                    let checkInDownvotes = found.downvotes.indexOf(req.loggedUser._id)
                    let checkInUpvotes = found.upvotes.indexOf(req.loggedUser._id)
                    if (checkInUpvotes !== -1) { // berarti ketemu
                        console.log('upvotes: exists');
                        found.upvotes.splice(checkInUpvotes, 1)
                        found.downvotes.push(req.loggedUser._id)
                        console.log('status: neutral');
                        return found.save()
                    } else {
                        console.log('upvote: not exist');
                        if (checkInDownvotes === -1) {
                            console.log('downvotes: not exist');
                            found.downvotes.push(req.loggedUser._id)
                            console.log('status: downvoted');
                        } else {
                            found.downvotes.splice(checkInDownvotes, 1)
                        }
                        Question.populate(found, {
                            path: 'author',
                            model: 'User'
                        })
                        return found.save()
                    }
                } else {
                    console.log('question not found');
                    console.log('returning 404');
                    throw {
                        code: 404,
                        message: 'Question not found'
                    }
                }
            }).then(success => {
                res.json(success)
            }).catch(next)
    }

    static upvoteAnswer(req, res, next) {
        console.log(req.params.answerId);
        Answer.findById(req.params.answerId)
            .then(found => {
                if (found) {
                    console.log('answer found');
                    console.log('=== CHECKING ===')
                    let checkInDownvotes = found.downvotes.indexOf(req.loggedUser._id)
                    let checkInUpvotes = found.upvotes.indexOf(req.loggedUser._id)
                    if (checkInDownvotes !== -1) { // berarti ketemu
                        console.log('downvotes: exists');
                        found.downvotes.splice(checkInDownvotes, 1)
                        found.upvotes.push(req.loggedUser._id)
                        console.log('status: neutral');
                        return found.save()
                    } else {
                        console.log('downvote: not exist');
                        if (checkInUpvotes === -1) {
                            console.log('upvotes: not exist');
                            found.upvotes.push(req.loggedUser._id)
                            console.log('status: upvoted');
                            return found.save()
                        } else {
                            found.upvotes.splice(checkInUpvotes, 1)
                            return found.save()
                        }
                    }
                } else {
                    console.log('answer not found');
                    console.log('returning 404');
                    throw {
                        code: 404,
                        message: 'Question not found'
                    }
                }
            }).then(success => {
                res.json(success)
            }).catch(next)
    }

    static downvoteAnswer(req, res, next) {
        console.log(req.params.answerId);
        Answer.findById(req.params.answerId)
            .then(found => {
                if (found) {
                    console.log('answer found');
                    console.log('=== CHECKING ===')
                    let checkInDownvotes = found.downvotes.indexOf(req.loggedUser._id)
                    let checkInUpvotes = found.upvotes.indexOf(req.loggedUser._id)
                    if (checkInUpvotes !== -1) { // berarti ketemu
                        console.log('upvotes: exists');
                        found.upvotes.splice(checkInUpvotes, 1)
                        found.downvotes.push(req.loggedUser._id)
                        console.log('status: neutral');
                        return found.save()
                    } else {
                        console.log('upvote: not exist');
                        if (checkInDownvotes === -1) {
                            console.log('downvotes: not exist');
                            found.downvotes.push(req.loggedUser._id)
                            console.log('status: downvoted');
                            return found.save()
                        } else {
                            found.downvotes.splice(checkInDownvotes, 1)
                            return found.save()
                        }
                    }
                } else {
                    console.log('answer not found');
                    console.log('returning 404');
                    throw {
                        code: 404,
                        message: 'Question not found'
                    }
                }
            }).then(success => {
                res.json(success)
            }).catch(next)
    }

    static async markAsSolved(req, res, next) {
        try {
            let question = await Question.findById(req.params.questionId)
            question.solved = !question.solved
            res.json(await question.save())
        } catch (error) {
            next(error)
        }
    }

}

module.exports = questionController