const Question = require('../models/question')
const Answer = require('../models/answer')
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
            tags : req.body.tags,
            userId : req.loggedUser.id
        })
        newQuestion.save()
        .then(question => {
            res.status(201).json(question)
        })
        .catch(next)
    }

    static getUserQuestion(req,res,next){
        console.log('masuk ke sini malahan',req.params.userId);
        
        // let userId = req.params.userId
        Question
        .find({userId : req.params.userId})
        .then(questions => {
            res.status(201).json(questions)
        })
        .catch(next)
    }

    static update(req,res,next){
        console.log('ini updateeeeeeeeee',req.body);
        
        let setVal = {}

        req.body.title && (setVal.title = req.body.title)
        req.body.description && (setVal.description = req.body.description)
        req.body.tags && (setVal.tags = req.body.tags)
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
        let Quest;
        Question
        .findByIdAndDelete(req.params.questionId)
        .then(question =>{
            Quest = question
           return Answer.deleteMany({questionId : question._id})
        })
        .then(data =>{
            res.status(201).json(Quest)
        })
        .catch(next)
    }
}

module.exports = QuestionController