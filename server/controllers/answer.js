const Model = require('../models');

class Answer {
  static create(req, res, next) {
    let answerObj = {
      title: req.body.title,
      description: req.body.description,
      upvotes: [],
      downvotes: [],
      author: req.decode._id
    }
    Model.Answer  .create(answerObj)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      next(err);
    })
  }
}

module.exports = Answer