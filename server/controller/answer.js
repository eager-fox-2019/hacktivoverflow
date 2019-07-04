const Answer = require('../models/Answer')
const Question = require('../models/Question')
const jwt = require('../helpers/jwt')

class AnswerController {
    static findAll(req,res,next){
       Answer.find()
       .then((foundAnswer)=>{
           if(!foundAnswer){
               throw ({status : 404, message : "Not Found"})
           } else {
                res.json(foundAnswer)
           }
       })
       .catch(next)

    }

   

    static findByPk(req,res,next){
        Answer.findById(req.params.id)
        .then((foundAnswer)=>{
            if(!foundAnswer){
                throw ({code : 404, message : "Not Found"})
            } else {
                 res.json(foundAnswer)
            }
        })
        .catch(next)
    }

    static create(req,res,next){
        let decodeToken = jwt.decode(req.headers.token)
        let newAnswer = {
            content: req.body.content,
            UserId: decodeToken.id,

        }
        let AnswerMdl = null
        // console.log(req.body, "ini req body");
        
        Answer.create(newAnswer)
            .then((gotData)=>{
                // console.log(gotData, "log afer create");
                
                AnswerMdl = gotData
                return Question.findByIdAndUpdate(req.body.questionId,{$push:{AnswerId:gotData._id}} )
            })
            .then((gotQuestion)=>{
                res.status(201).json(AnswerMdl)
                console.log(gotQuestio, "balikan seteah update");
                
                
            })
            .catch(next)

    }  
    static delete(req,res,next){
        Answer.findByIdAndDelete(req.params.id)
        .then((foundAnswer)=>{
            if(!foundAnswer){
                throw ({code : 404, message : "Not Found"})
            } else {
                 res.json(foundAnswer)
            }
        })
        .catch(next)

    }
    static update(req,res,next){
        Answer.findOne({_id : req.params.id})
        .then((foundAnswer)=>{
            if(!foundAnswer){
                throw ({code : 404, message : "Not Found"})
            } else {
                 foundAnswer.set(req.body)
                 return foundAnswer.save()
            }
        })
        .then((savedAnswer)=>{
            res.json(savedAnswer)
        })
        .catch(next)
    }
}

module.exports = AnswerController



