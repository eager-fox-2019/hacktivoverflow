const Question = require("../models/question.js");
const Answer = require("../models/answer.js");

class QuestionController {

  static create(req, res, next) {
    let id = req.decoded.id;
    let newQuestion = {
      title: req.body.title,
      description: req.body.description,
      votesUp: [],
      votesDown: [],
      created_at: new Date(),
      UserId: id
    };
    Question.create(newQuestion)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(next);
  }
}

module.exports = QuestionController;
