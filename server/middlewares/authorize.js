const Answer = require('../models/answer')
const Question = require('../models/question')

module.exports = {
    AnswerAutherization:(req, res, next) =>{
        if(req.headers.hasOwnProperty('token')) {
            Answer.findById(req.params.id)
            .then((answer) => {
                if(answer.userId.toString()==req.decoded.id) {
                    next()
                }else{
                    res.status(403).json({ err: 'Not authorize' });
                }
            })
            .catch(err => {
                res.status(500).json({'msg': 'Request error'})
            })
        }else {
            res.status(403).json({'err': 'Not authorize'})
        }
    },
    QuestionAutherization:(req, res, next) => {
        if(req.headers.hasOwnProperty('token')) {
            Question.findById(req.params.id)
            .then((question) => {
                if(question.userId.toString()==req.decoded.id) {
                    next()
                }else{
                    res.status(403).json({ err: 'Not authorize' });
                }
            })
            .catch(err => {
                res.status(500).json({'msg': 'Request error'})
            })
        }else {
            res.status(403).json({'err': 'Not authorize'})
        }
    }
}