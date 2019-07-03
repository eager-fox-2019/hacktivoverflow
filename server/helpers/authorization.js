const Model = require('../models');
module.exports = (req, res, next) => {
  Model.Question.find({_id: req.params.questionId})
    .then((question) => {
      if (question.length != 0) {
        if (question[0].userId == req.decode._id) {
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