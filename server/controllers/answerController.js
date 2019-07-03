const answerModel = require('../models/answerModel')
const questionModel = require('../models/questionModel')

class AnswerController {
    static findAll(req, res, next) {
        let questionId = req.params.questionId

        answerModel
            .find({
                questionId: questionId
            })
            .then((allAnswers) => {
                console.log(allAnswers)
                res.status(200).json(allAnswers)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    errors: err
                })
            })
    }

    static create(req, res, next) {
        let comment
        let newComment = {
            description: req.body.description,
            questionId: req.params.questionId,
            userId: req.decode._id,
            upVote: [],
            downVote: []
        }

        answerModel
            .create(newComment)
            .then((success) => {
                // console.log(success,'===============')
                comment = success
                return questionModel
                    .findById({
                        _id: newComment.questionId
                    })
            })
            .then((questionReady) => {
                questionReady.answers.push(comment._id)
                return questionReady.save()
            })
            .then((hasilSave) => {
                // console.log(hasilSave)
                res.status(200).json(hasilSave)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    errors: err
                })
            })
    }

    static update(req, res, next) {
        let answerId = req.params.answerId
        // console.log(answerId,'-=-=-=-=-=-=-==-=-')
        answerModel
            .findByIdAndUpdate({
                _id: answerId
            }, {
                description: req.body.description
            }, {
                new: true
            })
            .then((updated) => {
                console.log(updated)
                res.status(200).json(updated)
            })
            .catch((err) => {
                console.log(err)
                res.status(200).json({
                    errors: err
                })
            })
    }

    static upVote(req, res, next) {

        let id = req.params.answerId
        let userId = req.decode._id
        console.log(id, '<== ini answer ID...ini user ID==>', userId)
        answerModel
            .findById(id)
            .then((answerFound) => {
                // console.log(answerFound,'-==-=-=-=-=-=- ini answerfond')
                // console.log(answerFound.upVote.includes(userId),'~~~~~~iniiii~~~~~~')
                // console.log(answerFound.downVote.includes(userId),'~~~~~~iniiii keduaaaa~~~~~~')
                if (answerFound.upVote.includes(userId)) {
                    return answerModel
                        .findByIdAndUpdate(id, {
                            $pull: {
                                upVote: userId
                            }
                        }, {
                            new: true
                        })
                } else if (answerFound.downVote.includes(userId)) {
                    return answerModel
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
                    // console.log('seharusnya tuh disiniiii~~')
                    return answerModel
                        .findByIdAndUpdate(id, {
                            $push: {
                                upVote: userId
                            }
                        }, {
                            new: true
                        })
                }
            })
            .then((updated) => {
                // console.log('eehhhhh disiniiii____~~~~')
                console.log(updated)
                res.status(200).json(updated)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(updated)
            })
    }

    static downVote(req, res, next) {
        let id = req.params.answerId
        let userId = req.decode._id

        answerModel
            .findById(id)
            .then((foundAnswer) => {
                // console.log(foundAnswer)
                if (foundAnswer.downVote.includes(userId)) {
                    return answerModel
                        .findByIdAndUpdate(id, {
                            $pull: {
                                downVote: userId
                            }
                        }, {
                            new: true
                        })
                } else if (foundAnswer.upVote.includes(userId)) {
                    return answerModel
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
                    return answerModel
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
        let answerId = req.params.answerId

        answerModel
            .findOneAndDelete({
                _id: answerId
            })
            .then((deleted) => {
                console.log(deleted)
                res.status(200).json(deleted)
            })
            .catch((err) => {
                console.log(err)
                res.statu(500).json({
                    message: err
                })
            })
    }
}

module.exports = AnswerController







/**
 * untuk votes:
 * 
 * UP-VOTE
 * ============
 * ketika akan melakukan UP-VOTE maka pada arra Upvote dari question tsb akan dicek,
 * = jika pada upvote suda ada user tersebut 
 * == maka user tersebut akan menghilang,
 * 
 * = jika pada upvote belum ada user tersebut
 * == maka dicek lagi pada downvote
 * == = jika di downvote ada user tersebut
 * == maka user tersebut dihapus dari downvote lalu ditambahkan pada upvote
 * == = jika di downvote tidak ada 
 * == maka user tersebut akan dimasukkan ke dalam upvote
 * 
 * DOWN-VOTE
 * ============
 * kurang lebih sama dengan konsepnya up vote
 * ============
 * ketika akan melakukan UP-VOTE maka pada arra do dari question tsb akan dicek,
 * = jika pada do suda ada user tersebut 
 * == maka user tersebut akan menghilang,
 * 
 * = jika pada do belum ada user tersebut
 * == maka dicek lagi pada downvote
 * == = jika di downvote ada user tersebut
 * == maka user tersebut dihapus dari downvote lalu ditambahkan pada do
 * == = jika di downvote tidak ada 
 * == maka user tersebut akan dimasukkan ke dalam do
 */