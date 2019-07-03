const Model = require('../models');

class Question {

  static Create(req, res, next) {
    let questionObj = {
      title: req.body.title,
      description: req.body.description,
      upvotes: [],
      downvotes: [],
      answer: []
    }
    Model.Question.create(questionObj)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      next(err);
    })
  }
}

module.exports = Question