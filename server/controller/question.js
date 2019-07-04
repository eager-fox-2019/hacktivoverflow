const Question = require('../models/Question')
const jwt = require('../helpers/jwt')

class QuestionController {
    static findAll(req,res,next){
       Question.find()
       .populate('UserId')
        .populate('AnswerId')
        .sort([['updatedAt', 'descending']])
       .then((foundQuestion)=>{
           if(!foundQuestion){
               throw ({status : 404, message : "Not Found"})
           } else {
                res.json(foundQuestion)
           }
       })
       .catch(next)

    }

    static mypost(req,res,next){
       console.log("Masuk boss");
       
        console.log("Masuk sini");
        
        let decode = jwt.decode(req.headers.token)
        console.log(decode);
        
        Question.find({UserId : decode.id})
        .then((foundQuestion)=>{
            if(!foundQuestion){
                throw ({status : 404, message : "Not Found"})
            } else {
                 res.status(201).json(foundQuestion)
            }
        })
        .catch(next)
 
     }

    static findByPk(req,res,next){
        Question.findById(req.params.id)
        .populate({
            path: 'AnswerId',
            populate: {
                path: 'UserId'
            }
        })
        .populate('UserId')
        // .populate('UserId')
        .then((foundQuestion)=>{
            if(!foundQuestion){
                throw ({code : 404, message : "Not Found"})
            } else {
                 res.json(foundQuestion)
            }
        })
        .catch(next)
    }

    static create(req,res,next){
        console.log("masuk");
        
        let decodeToken = jwt.decode(req.headers.token)
        console.log(decodeToken, "balikan dari jwt");
        
        
        let newQuestion = {
            UserId: decodeToken.id,
            title: req.body.title,
            content: req.body.content,
            category : req.body.category
        }
        console.log('masuk create question', newQuestion);
        
        Question.create(newQuestion)
            .then((gotData)=>{
                res.status(201).json(gotData)
            })
            .catch(next)

    }  
    static delete(req,res,next){
        Question.findByIdAndDelete(req.params.id)
        .then((foundQuestion)=>{
            if(!foundQuestion){
                throw ({code : 404, message : "Not Found"})
            } else {
                 res.json(foundQuestion)
            }
        })
        .catch(next)

    }
    static update(req,res,next){
        Question.findOne({_id : req.params.id})
        .then((foundQuestion)=>{
            if(!foundQuestion){
                throw ({code : 404, message : "Not Found"})
            } else {
                 foundQuestion.set(req.body)
                 return foundQuestion.save()
            }
        })
        .then((savedQuestion)=>{

            res.json(savedQuestion)
        })
        .catch(next)
    }

    static likeVote(req,res,next){
        console.log(req.body,"llllllllllllllllll");
        let UserId = req.decoded.id
        let QuestionId = req.body.QuestionId
        console.log(QuestionId);
        
        Question.findOne({_id : QuestionId })
        .then((foundQuestion)=>{
            
            if(!foundQuestion){
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
                
                throw ({code : 404, message : "Not Found"})
            } else {
                if(foundQuestion.upVote.indexOf(UserId)>= 0){
                    return Question.findByIdAndUpdate(QuestionId,{$pull:{upVote:UserId}},{new:true})
                } else if(foundQuestion.downVote.indexOf(UserId)>= 0){
                    return Question.findByIdAndUpdate(QuestionId,{$pull:{downVote:UserId},$push:{upVote:UserId}},{new:true})
                } else {
                    return Question.findByIdAndUpdate(QuestionId,{$push:{upVote:UserId}},{new:true})
                }
            }
        })
        .then((savedQuestion)=>{
            console.log(savedQuestion, "Dapet DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            res.status(200).json(savedQuestion)
        })
        .catch(next)
    }

    static dislikeVote(req,res,next){
        Question.findOne({_id : req.params.id})
        .then((foundQuestion)=>{
            if(!foundQuestion){
                throw ({code : 404, message : "Not Found"})
            } else {
                 foundQuestion.set(req.body)
                 return foundQuestion.save()
            }
        })
        .then((savedQuestion)=>{
            res.json(savedQuestion)
        })
        .catch(next)
    }
}

module.exports = QuestionController