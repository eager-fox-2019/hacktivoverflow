const Answer = require('../models/answer');

class AnswerController {
  static create(req, res, next) {
    let props = {
      title: req.body.title,
      comment: req.body.comment,
      QuestionId: req.params.questionId,
      UserId: req.decoded.id,
      created_at: new Date(),
    };
    Answer.create(props)
      .then(answer => {
        res.status(201).json(answer);
      })
      .catch(next);
  }
  static find(req, res, next) {
    let myAnswer = req.query.myAnswer;
    let id = req.decoded.id;
    let questionId = req.params.questionId;
    let userAnswer = {
      UserId: id,
      QuestionId: questionId
    };
    if (!myAnswer) delete userAnswer.UserId;
    Answer.find(userAnswer)
      .populate('QuestionId')
      .populate('UserId')
      .populate('upvotes')
      .populate('downvotes')
      .exec()
      .then(answers => {
        res.json(answers);
      })
      .catch(next);
  }
  static update(req, res, next) {
    let id = req.params.id;
    let update = Object.assign({}, req.body)
    Answer.findByIdAndUpdate(id,
      { $set: update },
      { new: true })
      .exec()
      .then(answer => {
        res.json(answer);
      })
      .catch(next);
  }
  static delete(req, res, next) {
    let id = req.params.id;
    Answer.findByIdAndDelete(id)
      .exec()
      .then(answer => {
        res.json(answer);
      })
      .catch(next);
  }
  static upvote(req, res, next) {
    let id = req.decoded.id;
    let answerId = req.params.id;
    Answer.findById(answerId)
      .exec()
      .then(answer => {
        let updates;
        if(answer.downvotes.includes(id)) {
          updates = {
            $pull: { downvotes: id },
            $push: { upvotes: id },
          };
        } else if (answer.upvotes.includes(id)) {
          updates = { $pull: { upvotes: id } };
        } else {
          updates = { $push: { upvotes: id } }
        }
        return Answer.findByIdAndUpdate( answerId, updates, { new: true } ).exec()
      })
      .then(answer => {
        return Answer.populate(answer, { path: "upvotes" });
      })
      .then(answer => {
        res.json(answer);
      })
      .catch(next);
  }
  static downvote(req, res, next) {
    let id = req.decoded.id;
    let answerId = req.params.id;
    Answer.findById(answerId)
      .exec()
      .then(answer => {
        let updates;
        if (answer.upvotes.includes(id)) {
          updates = {
            $pull: { upvotes: id },
            $push: { downvotes: id },
          };
        } else if (answer.downvotes.includes(id)) {
          updates = { $pull: { downvotes: id } };
        } else {
          updates = { $push: { downvotes: id } };
        }
        return Answer.findByIdAndUpdate(answerId, updates, { new: true }).exec()
      })
      .then(answer => {
        return Answer.populate(answer, { path: "downvotes" });
      })
      .then(answer => {
        res.json(answer);
      })
      .catch(next);
  }
}

module.exports = AnswerController;
