const Answer = require('../models/answer');
module.exports = (req, res, next) => {
  Answer.find({_id: req.params.answerId})
    .then((answer) => {
      if (answer.length != 0) {
        if (answer[0].author == req.decode._id) {
          next();
        } else {
          next({
            code: 401
          });
        }
      } else {
        next({
          code: 404
        });
      }
    })
    .catch((err) => {
      next(err);
    });
}