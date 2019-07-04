const Answer = require('../models/answer')
const User = require('../models/user')
const Question = require('../models/question')

class AnswerController{

    static getAll(req,res,next){
        Answer
        .find({})
        .then(answers =>{
            res.status(200).json(answers)
        })
        .catch(next)
    }

    static getOne(req,res,next){
        console.log('masuk get one========');
        
        Answer
        .findById(req.params.answerId)
        .then(answer =>{
            console.log('ini answer========',answer);
            
            res.status(200).json(answer)
        })
        .catch(next)
    }

    static getUserAnswer(req,res,next){
        Answer
        .find({userId : req.params.userId})
        .then(answers =>{
            res.status(200).json(answers)
        })
        .catch(next)
    }

    static getAnswerByQuestion(req,res,next){
        Answer
        .find({questionId : req.params.questionId})
        .then(answers =>{
            res.status(200).json(answers)
        })
        .catch(next)
    }
    
    static create(req,res,next){
        console.log('req.body create answer',req.body,req.params);
            let answerCreated;
            let newAnswer = new Answer({
                title : req.body.title,
                description : req.body.description,
                userId : req.loggedUser.id,
                questionId : req.params.questionId
            })
            newAnswer.save()
            .then(answer =>{
                answerCreated = answer
                return Question.findOneAndUpdate({_id : req.params.questionId}, { $push: {answerList : answer._id}},{new : true})
            })
            .then(question =>{
                console.log('updated question ==>',question);
                res.status(200).json(answerCreated)
            })
            .catch(next)
        }

    static delete(req,res,next){
        console.log('masuk ke conts delete answer');
        
        let questionId = req.params.questionId
        let answerId = req.params.answerId
        let deleted;
        Answer
        .findOneAndDelete({_id : answerId})
        .then(answer => {
            deleted = answer
            return Question.findOneAndUpdate({_id: questionId},{$pull : {answerList : answerId}},{new : true})
        })
        .then(question =>{
            res.status(200).json(deleted)
        })
        .catch(next)
    }

    static update(req,res,next){
        console.log('masuk answer update====');
        console.log('req bodyyyy',req.body,req.params.answerId);
        
        let setVal = {}

        req.body.title && ( setVal.title = req.body.title )
        req.body.description && ( setVal.description = req.body.description )

        Answer
        .findByIdAndUpdate(req.params.answerId, setVal,{new : true})
        .then(answer =>{
            console.log('ini answerrrrrr',answer);
            res.status(201).json(answer)
        })
        .catch(next)
    }

    static upvote(req,res,next){
        console.log('masuk upvote');
        
        let neutralize = false
        Answer.findOne({_id : req.params.answerId})
        .then(answer =>{
            console.log('hasil find one and update',answer);
            
            let checkInUpvote = answer.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = answer.downVotes.indexOf(req.loggedUser.id)
            if(checkInDownvote !== -1){
                console.log(`status downvoted`);
                return Answer.findByIdAndUpdate(answer._id, {$pull : {downVotes : req.loggedUser.id}}, {new : true})
            }else{
                if(checkInUpvote === -1){
                    console.log(`status == not yet voted`);
                    return Answer.findByIdAndUpdate(answer._id, {$push : {upVotes : req.loggedUser.id}}, {new : true})
                }else{
                    console.log('status already upvoted, reverting to netral');
                    neutralize = true
                    return Answer.findByIdAndUpdate(answer._id, {$pull : {upVotes : req.loggedUser.id}}, {new : true})
                }

            }
        })
        .then(answer =>{
            let checkInUpvote = answer.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = answer.downVotes.indexOf(req.loggedUser.id)
            if(checkInDownvote === -1 && checkInUpvote === -1 && neutralize === false){
                console.log('after pull from downvote, ready to push to upvote');
                
                return Answer.findByIdAndUpdate(answer._id, {$push : {'upVotes' : req.loggedUser.id}}, {new : true})
            }else{
                console.log('check two, action already taken, no need update');
                
                return answer
            }
        })
        .then(answer =>{
            res.status(200).json(answer)
        })
        .catch(next)
    }

    static downvote(req,res,next){
        console.log('masuk downvote');
        
        let neutralize = false
        Answer.findOne({_id : req.params.answerId})
        .then(answer =>{
            console.log('hasil find one and update',answer);
            let checkInUpvote = answer.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = answer.downVotes.indexOf(req.loggedUser.id)
            if(checkInUpvote !== -1){
                console.log(`status upvoted`);
                return Answer.findByIdAndUpdate(answer._id, {$pull : {'upVotes' : req.loggedUser.id}}, {new : true})                
                
            }else{
                if(checkInDownvote === -1){
                    console.log(`status == not yet voted`);
                    return Answer.findByIdAndUpdate(answer._id, {$push : {'downVotes' : req.loggedUser.id}}, {new : true})                   
                }else{
                    console.log('status already down voted, reverting to netral');
                    neutralize = true
                    return Answer.findByIdAndUpdate(answer._id, {$pull : {'downVotes' : req.loggedUser.id}}, {new : true})
                }
     
            }
        })
        .then(answer =>{
            let checkInUpvote = answer.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = answer.downVotes.indexOf(req.loggedUser.id)
            if(checkInDownvote === -1 && checkInUpvote === -1 && neutralize === false){
                console.log('after pull from upVote, ready to push to upvote');
                
                return Answer.findByIdAndUpdate(answer._id, {$push : {'downVotes' : req.loggedUser.id}}, {new : true})
            }else{
                console.log('check two, action already taken, no need update');
                return answer
            }
            
        })
        .then(answer =>{
            res.status(200).json(answer)
        })
        .catch(next)
    }

    
}

module.exports = AnswerController