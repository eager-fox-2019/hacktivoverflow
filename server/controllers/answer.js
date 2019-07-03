const Model = require('../models');

class Answer {

  static Create(req, res, next) {
    let answerObj = {
      title: req.body.title,
      description: req.body.description,
      upvotes: [],
      downvotes: [],
      answer: []
    }
    Model.answer.create(answerObj)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      next(err);
    })
  }
}

module.exports = Answer