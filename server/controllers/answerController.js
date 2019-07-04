const Question= require('../models/question')
const Answer= require('../models/answer')

class answerController{

    static create(req, res, next){
        let newAnswer= new Answer({
            title: req.body.title,
            description: req.body.description,
            upvotes: [],
            downvotes: [],
            questionId: req.body.questionId,
            userId: req.decode.id
        })

        newAnswer.save()
        .then(answer =>{
            res.status(201).json(answer)
        })
        .catch(next)
    }

    static findAll(req, res, next){
        Answer.find({questionId: req.params.questionId}).populate('userId')
        .then(answers =>{
            res.status(200).json(answers)
        })
        .catch(next)
    }

    static findOne(req, res, next){
        Answer.findById(req.params.id).populate('questionId')
        .then(answer =>{
            if(answer){
                res.status(200).json(answer)
            }else{
                throw ({code: 404, message: 'Answer not found!'})
            }
        })
        .catch(next)
    }

    static update(req, res, next){
        let updateValue={
            title: req.body.title,
            description: req.body.description
        }
        Answer.findByIdAndUpdate(req.params.id, updateValue)
        .then(answer=>{
            if(answer){
                res.status(200).json(answer)
            }else{
                throw {code: 404, message: 'Answer not found! '}
            }
        })
        .catch(next)
    }

    static updateUpvotes(req, res, next){
        let _id= req.params.id
        let userId= req.decode.id

        Answer.findById(_id)
        .then( answer =>{
            if(!answer){
                throw {code: 404, message: 'Answer not found!'}
            }else{
                if(answer.upvotes.includes(userId)){
                    throw {code: 400, message: 'You have been vote'}
                }else{
                    Promise.all([
                        Answer.findByIdAndUpdate(_id, {$addToSet : { upvotes: userId }}),
                        Answer.findByIdAndUpdate(_id , {$pull : { downvotes: userId }})
                    ])
                    .then(answer =>{
                        res.status(200).json(answer)
                    })
                    .catch(next)
                }
            }
        })
    }

    static updateDownvotes(req, res, next){
        let _id= req.params.id
        let userId= req.decode.id

        Answer.findById(_id)
        .then( answer =>{
            if(!answer){
                throw {code: 404, message: 'Answer not found!'}
            }else{
                if(answer.downvotes.includes(userId)){
                    throw {code: 400, message: 'You have been vote'}
                }else{
                    Promise.all([
                        Answer.findByIdAndUpdate(_id , {$addToSet : { downvotes: userId }}),
                        Answer.findByIdAndUpdate(_id , {$pull : { upvotes: userId }})
                    ])
                    .then(answer =>{
                        res.status(200).json(answer)
                    })
                    .catch(next)
                }
            }
        })
    }

    static remove(req, res, next){
        Answer.findByIdAndDelete(req.params.id)
        .then(answer =>{
            res.status(200).json(answer)
        })
        .catch(next)
    }
}

module.exports= answerController