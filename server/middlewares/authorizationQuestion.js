const Question = require('../models/question');
module.exports = (req, res, next) => {
  Question.find({_id: req.params.questionId})
    .then((question) => {
      if (question.length != 0) {
        if (question[0].author == req.decode._id) {
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