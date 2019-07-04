const Question = require('../models/question')

module.exports = async function (req, res, next) {
  let { id } = req.params
  let user = req.user
  let question = await Question.findOne({_id: id}).exec()
  if (question) {
    if (question.user === user) {
      next()
    } else {
      next ({code:401, msg: "not authorized"})
    }
  } else {
    next ({code:401, msg: "not authorized"})
  }
}