const { Answer } = require('../models')

class ControllerAnswer {
    static create(req, res, next) {
        let userId = req.user._id
        let { description } = req.body
        let { questionId } = req.params
        Answer.create({ description, userId, questionId})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    static findAll(req, res, next) {
        Answer.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    static findOne(req, res, next) {
        Answer.findOne({ _id: req.params.id })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(next)
    }
    static update(req, res, next) {
        let { description } = req.body
        Answer.findOneAndUpdate({ _id: req.params.id }, { description }, { new: true })
            .then(answer => {
                res.status(200).json(answer)
            })
            .catch(next)
    }
    static upVote (req, res, next) {
        let answerId = req.params.id
        let voter = req.user._id
        Answer.findOne({ _id: answerId})
        .then(data =>{
            if(data.upVotes.includes(voter)){
                return Answer.findOneAndUpdate({_id: answerId}, {$pull: {upVotes: voter}}, {new : true})
            }else if (data.downVotes.includes(voter)){
                return Answer.findOneAndUpdate({_id: answerId}, {$pull: {downVotes: voter}}, {new : true})
                .then(data =>{
                    return Answer.findOneAndUpdate({_id: answerId}, {$push: {upVotes: voter}}, {new : true})
                })
            }
            else {
                return Answer.findOneAndUpdate({_id: answerId}, {$push: {upVotes: voter}}, {new : true})
            }
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(next)
    }
    static downVote (req, res, next) {
        let answerId = req.params.id
        let voter = req.user._id
        Answer.findOne({ _id: answerId})
        .then(data =>{
            if(data.downVotes.includes(voter)){
                return Answer.findOneAndUpdate({_id: answerId}, {$pull: {downVotes: voter}}, {new : true})
            }else if (data.upVotes.includes(voter)){
                return Answer.findOneAndUpdate({_id: answerId}, {$pull: {upVotes: voter}}, {new : true})
                .then(data =>{
                    return Answer.findOneAndUpdate({_id: answerId}, {$push: {downVotes: voter}}, {new : true})
                })
            }
            else {
                return Answer.findOneAndUpdate({_id: answerId}, {$push: {downVotes: voter}}, {new : true})
            }
        })
        .then(data =>{
                res.status(201).json(data)
        })
        .catch(next)
    }
    static delete (req, res, next) {
        let { questionId } = req.params
        Answer.deleteMany({ questionId })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = ControllerAnswer