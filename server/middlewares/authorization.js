const Question= require('../models/question')
const Answer= require('../models/answer')

module.exports= {
    authorizationQuestion: function(req, res, next){
        Question.findById(req.params.id)
        .then(question=>{
            if(!question){
                res.status(404).json('Not found')
            }else{
                if(req.decode.id == question.userId){
                    next()
                }else{
                    res.status(403).json('Not Authorized')
                }
            }
        })
        .catch(next)
    },

    authorizationAnswer: function(req, res, next){
        Answer.findById(req.params.id)
        .then(answer=>{
            if(!answer){
                res.status(404).json('Not found')
            }else{
                if(req.decode.id == answer.userId){
                    next()
                }else{
                    res.status(403).json('Not Authorized')
                }
            }
        })
        .catch(next)
    }
}
