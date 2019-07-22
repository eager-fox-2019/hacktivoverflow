const Answer = require('../models/answer')

class answerController {
    static createAnswer(req, res) {
        let { title, description } = req.body
        Answer.create({
            title,
            description,
            question : req.params.questionId,
            creator : req.decoded._id
        })
        .then( (created) => {
            return Answer.populate(created, {path:'creator'})
        })
        .then( (created) => {
            res.status(200).json(created)
        })
        .catch( (err) => {
            res.status(500).json({
                error: err
            })
        })
    }

    static getUsersAnswer(req, res){
        Answer.find()
        .populate('creator')
        .then( (answers) =>{
            res.status(200).json(answers)
        })
        .catch( (err) => {
            res.status(500).json({error: err})
        })
    }

    static getAnswersOfOneQuestion(req, res){
        Answer.find({
            question: req.params.questionId
        })
        .populate('creator')
        .then( (answers)=>{
            res.status(200).json(answers)
        })
        .catch( (err) => {
            res.status(500).json({error: err})
        })
    }

    static deleteAnswer(req, res) {
        Answer.findByIdAndRemove(req.params.id)
        .then( (deletedAnswer) => {
            res.status(200).json(deletedAnswer)
        })
        .catch( (err) => {
            res.status(500).json({
                error: err
            })
        })
    }

    static updateAnswer(req, res){
        Answer.findById(req.params.id)
        .populate('creator')
        .then( (answer) =>{
            answer.set(req.body)
            return answer.save()
        })
        .then( (updatedAnswer) =>{
            res.status(200).json({data: updatedAnswer})
        })
        .catch( (err) => {
            res.status(500).json({
                error: err
            })
        })
    }

    static upVote(req, res){
        let id = req.decoded._id
        let answerId = req.params.id
        Answer.findById(answerId)
        .populate('creator')
        .then( (answer) =>{
            if (answer.downvotes.includes(id)){
                return Answer.findByIdAndUpdate(answerId, {$pull: {downvotes: id}}, {new:true})
            } else if (answer.upvotes.includes(id)){
                return Answer.findByIdAndUpdate(answerId, {$pull: {upvotes: id}}, {new:true})
            } else {
                return answer
            }
        })
        .then( (answer) => {
            answer.upvotes.push(id)
            return answer.save()
        })
        .then( (answer) =>{
            return Answer.populate(answer, {path:'creator'})
        })
        .then( (upvotedAnswer) =>{
            res.status(200).json(upvotedAnswer)
        })
        .catch( (err) => {
            res.status(500).json({
                error: err
            })
        })
    }

    static downVote(req, res){
        let id = req.decoded._id
        let answerId = req.params.id
        Answer.findById(answerId)
        .then( (answer) =>{
            if (answer.upvotes.includes(id)) {
                return Answer.findByIdAndUpdate(answerId, {$pull: {upvotes: id}}, {new:true} )
            } else if (answer.downvotes.includes(id)) {
                return Answer.findByIdAndUpdate(answerId, {$pull: {downvotes: id}}, {new:true} )
            } else {
                return answer
            }
        })
        .then( (answer) => {
            answer.downvotes.push(id)
            return answer.save()
        })
        .then( (answer) =>{
            return Answer.populate(answer, {path:'creator'})
        })
        .then( (downvotedAnswer) =>{
            res.status(200).json(downvotedAnswer)
        })
        .catch( err => {
            res.status(500).json({error: err})
        })
    }

    static removeVote(req, res){
        let id = req.decoded._id
        let answerId = req.params.id
        Answer.findByIdAndUpdate(answerId, {$pull: { upvotes: id, downvotes: id}}, {new:true})
        .populate('creator')
        .then( (updated) => {
            res.status(200).json(updated)
        })
        .catch( (err) =>{
            res.status(500).json(err)
        })
    }
}

module.exports = answerController