const Question = require('../models/question')
const User = require('../models/user')
class QuestionController{
    
    static getAll(req,res,next){
        Question
        .find({})
        .populate('answerList')
        .then(questions =>{
            res.status(201).json(questions)
        })
        .catch(next)
    }

    static getOne(req,res,next){
        console.log('masuk ke get one');
        
        Question
        .findById(req.params.questionId)
        .populate('answerList')
        .then(question =>{
            res.status(200).json(question)
        })
        .catch(next)
    }

    static create(req,res,next){
        let newQuestion = new Question({
            title : req.body.title,
            description : req.body.description,
            userId : req.loggedUser.id
        })
        newQuestion.save()
        .then(question => {
            res.status(201).json(question)
        })
        .catch(next)
    }

    static getUserQuestion(req,res,next){
        console.log('masuk ke sini malahan');
        
        let userId = req.params.userId
        Question
        .find({userId : userId})
        .then(questions => {
            res.status(201).json(questions)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                msg : `internal server error`
            })
        })
    }

    static update(req,res,next){
        let setVal = {}

        req.body.title && (setVal.title = req.body.title)
        req.body.description && (setVal.description = req.body.description)

        Question
        .findByIdAndUpdate(req.params.questionId, setVal,{new : true})
        .then(question =>{
            res.status(201).json(question)
        })
        .catch(next)
    }

    static upvote(req,res,next){
        let neutralize = false
        Question.findOne({_id : req.params.questionId})
        .then(question =>{
            console.log('hasil find one and update',question);
            
            let checkInUpvote = question.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = question.downVotes.indexOf(req.loggedUser.id)
            if(checkInDownvote !== -1){
                console.log(`status downvoted`);
                return Question.findByIdAndUpdate(question._id, {$pull : {downVotes : req.loggedUser.id}}, {new : true})
            }else{
                if(checkInUpvote === -1){
                    console.log(`status == not yet voted`);
                    return Question.findByIdAndUpdate(question._id, {$push : {upVotes : req.loggedUser.id}}, {new : true})
                }else{
                    console.log('status already upvoted, reverting to netral');
                    neutralize = true
                    return Question.findByIdAndUpdate(question._id, {$pull : {upVotes : req.loggedUser.id}}, {new : true})
                }

            }
        })
        .then(question =>{
            let checkInUpvote = question.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = question.downVotes.indexOf(req.loggedUser.id)
            if(checkInDownvote === -1 && checkInUpvote === -1 && neutralize === false){
                console.log('after pull from downvote, ready to push to upvote');
                
                return Question.findByIdAndUpdate(question._id, {$push : {'upVotes' : req.loggedUser.id}}, {new : true})
            }else{
                console.log('check two, action already taken, no need update');
                
                return question
            }
        })
        .then(question =>{
            res.status(200).json(question)
        })
        .catch(next)
    }

    static downvote(req,res,next){
        console.log('masuk downvote');
        
        let neutralize = false
        Question.findOne({_id : req.params.questionId})
        .then(question =>{
            console.log('hasil find one and update',question);
            let checkInUpvote = question.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = question.downVotes.indexOf(req.loggedUser.id)
            if(checkInUpvote !== -1){
                console.log(`status upvoted`);
                return Question.findByIdAndUpdate(question._id, {$pull : {'upVotes' : req.loggedUser.id}}, {new : true})                
                
            }else{
                if(checkInDownvote === -1){
                    console.log(`status == not yet voted`);
                    return Question.findByIdAndUpdate(question._id, {$push : {'downVotes' : req.loggedUser.id}}, {new : true})                   
                }else{
                    console.log('status already down voted, reverting to netral');
                    neutralize = true
                    return Question.findByIdAndUpdate(question._id, {$pull : {'downVotes' : req.loggedUser.id}}, {new : true})
                }
     
            }
        })
        .then(question =>{
            let checkInUpvote = question.upVotes.indexOf(req.loggedUser.id)
            let checkInDownvote = question.downVotes.indexOf(req.loggedUser.id)
            if(checkInDownvote === -1 && checkInUpvote === -1 && neutralize === false){
                console.log('after pull from upVote, ready to push to upvote');
                
                return Question.findByIdAndUpdate(question._id, {$push : {'downVotes' : req.loggedUser.id}}, {new : true})
            }else{
                console.log('check two, action already taken, no need update');
                
                return question
            }
            
        })
        .then(question =>{
            res.status(200).json(question)
        })
        .catch(next)
    }

    static delete(req,res,next){
        console.log('masuk ke delete controller question');
        
        let questionId = req.params.questionId
        User
        .findByIdAndUpdate({_id : req.loggedUser.id},{$pull : {questionList : questionId}},{new : true})
        .then(({data})=>{
            return Question.findOneAndDelete({_id : questionId})    
        })
        .then(question =>{
            res.status(201).json(question)
        })
        .catch(next)
    }
}

module.exports = QuestionController