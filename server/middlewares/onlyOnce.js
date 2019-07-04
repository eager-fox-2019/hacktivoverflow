const Answer = require('../models/answer')

module.exports = (req, res, next) => {
  Answer.findOne({
    user: req.decoded._id,
    question: req.params.questionId
  })
  .then(row =>{
    if(!row)
      next()
    else 
      next({ code: 400, message: 'Cannot answer twice to the same question' })
  })
  .catch(next)
}