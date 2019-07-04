const Answer = require('../models/answer')

module.exports = function (req, res, next) {
    Answer.findById({
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
                    message: "Answer not found"
                })
            }
        })
        .catch(next)
}