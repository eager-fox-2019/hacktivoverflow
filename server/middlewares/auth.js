const Question = require('../models').Question
const Answer = require('../models').Answer
const { verifyToken } = require('../helpers/jwt')

module.exports = {
    authentication (req, res, next){
        if(req.headers.hasOwnProperty('token')){
            try{
                const decode = verifyToken(req.headers.token)
                req.decode = decode
                next()
            } catch(err){
                next({code: 400, message: 'Unverified token'})
            }
        } else {
            next({code: 400, message: 'Token not found'})
        }
    },
    authorizationQuestion(req, res, next){
        Question.findByPk(req.params.id)
            .then(question => {
                if(question){
                    if(question.owner === req.decode.id){
                        next()
                    } else {
                        throw {status: 401}
                    }
                } else {
                    throw {status: 404}
                }
            })
            .catch(next)
    },
    authorizationAnswer(req, res, next){
        Answer.findByPk(req.params.id)
            .then(answer => {
                if(answer){
                    if(answer.owner === req.decode.id){
                        next()
                    } else {
                        throw {status: 401}
                    }
                } else {
                    throw {status: 404}
                }
            })
            .catch(next)
    }
}