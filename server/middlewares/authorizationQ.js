const Question = require('../models/question')

module.exports = function (req, res, next) {
    Question.findById({
            _id: req.params.id
        })
        .then(data => {
            if (data) {
                if (req.decoded.id == String(data.userId)) {
                    next()
                } else {
                    throw ({
                        status: 401,
                        message: "Unauthorized"
                    })
                }
            } else {
                throw({
                    status: 404,
                    message: "Question not found"
                })
            }
        })
        .catch(next)
}