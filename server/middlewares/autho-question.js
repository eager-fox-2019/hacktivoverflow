const Question = require('../models/question')

module.exports = (req, res, next) => {
  Question.findOne({
      _id: req.params.id
    })
    .then(question => {
      if (question) {
        if (question.user.equals(req.decoded._id)) {
          next()
        } else {
          next({
            code: 403,
            message: 'Unauthorized'
          })
        }
      } else
        next({
          code: 404,
          message: `Question with id ${ req.params.id } not found!`
        })
    })
    .catch(next)
}