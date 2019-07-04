const Answer = require('../models/answer')

module.exports = (req, res, next) => {
  Answer.findOne({
      _id: req.params.id
    })
    .then(answer => {
      if (answer) {
        if (answer.user.equals(req.decoded._id)) {
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
          message: `Answer with id ${ req.params.id } not found!`
        })
    })
    .catch(next)
}