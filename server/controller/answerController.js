const Answer = require('../models/answer')
const ObjectId = require('mongoose').Types.ObjectId

class answerController {
    static createAnswer(req, res, next) {
        let id = req.decoded._id
        let questionId = req.params.questionId
        let { title, description } = req.body
        Answer
            .create({
                title,
                description,
                question : questionId,
                creator : id
            })
            .then( created =>{
                console.log('sini')
                return Answer.populate(created, {path:'creator'})
            })
            .then(created=>{
                console.log('sini?')
                res.status(200).json(created)
            })
            .catch(next)
    }
    static getUsersAnswer(req, res, next){
        let id = req.decoded._id
        console.log(id)
        Answer
            .find()
            .populate('creator')
            .then(answers =>{
                res.status(200).json(answers)
            })
            .catch(next)

    }
    static getAnswersOfOneQuestion(req, res, next){
        let questionId = req.params.questionId
        Answer
            .find( {question: ObjectId(questionId)})
            .populate('creator')
            .then(answers=>{
                res.status(200).json(answers)
            })
            .catch(next)

    }
    static deleteAnswer(req, res, next) {
        let answerId = req.params.id
        Answer
            .findByIdAndRemove(answerId/*id*/)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(next)

    }
    static updateAnswer(req, res, next){
        let answerId = req.params.id
        Answer
            .findById(answerId)
            .populate('creator')
            .then(answer =>{
                answer.set(req.body)
                return answer.save()
            })
            .then(updated =>{
                res.status(200).json({data: updated})
            })
            .catch(next)

    }
    static upvote(req, res, next){
        let id = req.decoded._id
        let answerId = req.params.id
        Answer
            .findById(answerId)
            .populate('creator')
            .then( answer =>{
                if(answer.downvotes.includes(id)){
                    return Answer
                        .findByIdAndUpdate(answerId,
                            {$pull:
                                {downvotes: id}
                            },
                            {new:true}
                        )
                }else if(answer.upvotes.includes(id)){
                    return Answer
                        .findByIdAndUpdate(answerId,
                            {$pull:
                                {upvotes: id}
                            },
                            {new:true}
                        )
                }else{
                    return answer
                }
            })
            .then( answer => {
                answer.upvotes.push(id)
                return answer.save()
            })
            .then( answer =>{
                return Answer.populate(answer, {path:'creator'})
            })
            .then( upvotedAnswer =>{
                res.status(200).json(upvotedAnswer)
            })
            .catch(next)
    }
    static downvote(req, res, next){
        let id = req.decoded._id
        let answerId = req.params.id
        Answer
            .findById(answerId)
            .then( answer =>{
                if(answer.upvotes.includes(id)){
                    return Answer
                        .findByIdAndUpdate(answerId,
                            {$pull:
                                {upvotes: id}
                            },
                            {new:true}
                        )
                }else if(answer.downvotes.includes(id)){
                    return Answer
                        .findByIdAndUpdate(answerId,
                            {$pull:
                                {downvotes: id}
                            },
                            {new:true}
                        )
                }else{
                    return answer
                }
            })
            .then( answer => {
                answer.downvotes.push(id)
                return answer.save()
            })
            .then( answer =>{
                return Answer.populate(answer, {path:'creator'})
            })
            .then( downvotedAnswer =>{
                res.status(200).json(downvotedAnswer)
            })
            .catch(next)
    }
    static removeUporDown(req, res, next){
        let id = req.decoded._id
        let answerId = req.params.id
        Answer
            .findByIdAndUpdate(answerId,
                {$pull:
                    {
                        upvotes: id,
                        downvotes: id
                    }
                },
                {new:true}
            )
            .populate('creator')
            .then( updated => {
                res.status(200).json( updated)
            })
            .catch(next)

    }
}
module.exports = answerController