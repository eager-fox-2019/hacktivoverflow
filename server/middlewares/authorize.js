const Question = require('../models/questionModel');
module.exports = function (req, res, next) {
    try {
        console.log(req.params.questionId, " iini req prams")
        Question.findById(req.params.questionId)
            .then((question) => {
                if (question.author.equals(req.decoded.id)) {
                    next()
                } else {
                    next({ status: 400, messages: 'You dont have access' })
                }
            })
            .catch(err => {
                res.status(404).json({ msg: err.message })
            })
    } catch (error) {
        throw 'You dont have access'
    }
} 
