const Answer = require("../models/answer.js");

class AnswerController {
  static create(req, res, next) {
    let id = req.decoded.id;
    let questionId = req.params.questionId;
    let newAnswer = {
      title: req.body.title,
      description: req.body.description,
      votesUp: [],
      votesDown: [],
      created_at: new Date(),
      QuestionId: questionId,
      UserId: id
    };
    Answer.create(newAnswer)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(next);
  }
}

module.exports = AnswerController;
