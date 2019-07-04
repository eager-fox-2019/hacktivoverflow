const Answer = require('../models/answer')

module.exports = async function (req, res, next) {
  let { id } = req.params
  let user = req.user
  let answer = await Answer.findOne({ _id: id }).exec()
  if (answer) {
    if (answer.user == user) {
      next()
    } else {
      next({ code: 401, msg: "not authorized" })
    }
  } else {
    next({ code: 401, msg: "not authorized" })
  }
}