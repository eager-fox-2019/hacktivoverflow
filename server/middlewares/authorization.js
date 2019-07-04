const Question = require('../models/question')

function authorization(req, res, next) {
    Question.findById(req.params.questionid)
        .then((data) => {
            if (data.user_id == req.decoded.id) {
                next()
            }else{
                res.send(401).json({
                    message: " you are not authorized"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.send(401).json({
                message: " you are not authorized"
            })
        })
}

module.exports = { authorization }