const Question = require('../models/question');
const Answer = require('../models/answer');

class QuestionController {
  static create(req, res, next) {
    let props = {
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags || [],
      UserId: req.decoded.id,
      created_at: new Date(),
    };
    Question.create(props)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(next);
  }
  static find(req, res, next) {
    let myQuestion = req.query.myQuestion;
    let search = req.query.search;
    let id = req.decoded.id;
    let userQuestion = {
      _id: search,
      UserId: id
    };
    if (!myQuestion) delete userQuestion.UserId;
    if (!search) delete userQuestion._id;
    Question.find(userQuestion)
      .populate('UserId')
      .populate('upvotes')
      .populate('downvotes')
      .exec()
      .then(questions => {
        res.json(questions);
      })
      .catch(next);
  }
  static update(req, res, next) {
    let id = req.params.questionId;
    let update = Object.assign({}, req.body)
    Question.findByIdAndUpdate(id,
      { $set: update },
      { new: true })
      .exec()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
  static delete(req, res, next) {
    let id = req.params.questionId;
    Question.findByIdAndDelete(id)
      .exec()
      .then(() => {
        return Answer.deleteMany({ QuestionId: id }).exec()
      })
      .then(answer => {
        res.json(answer);
      })
      .catch(next);
  }
  static upvote(req, res, next) {
    let id = req.decoded.id;
    let questionId = req.params.questionId;
    Question.findById(questionId)
      .exec()
      .then(question => {
        let updates;
        if (question.downvotes.includes(id)) {
          updates = {
            $pull: { downvotes: id },
            $push: { upvotes: id },
          };
        } else if (question.upvotes.includes(id)) {
          updates = { $pull: { upvotes: id } };
        } else {
          updates = { $push: { upvotes: id } };
        }
        return Question.findByIdAndUpdate(questionId, updates, { new: true }).exec()
      })
      .then(question => {
        return Question.populate(question, { path: "upvotes" });
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
  static downvote(req, res, next) {
    let id = req.decoded.id;
    let questionId = req.params.questionId;
    Question.findById(questionId)
      .exec()
      .then(question => {
        let updates;
        if (question.upvotes.includes(id)) {
          updates = {
            $pull: { upvotes: id },
            $push: { downvotes: id },
          };
        } else if (question.downvotes.includes(id)) {
          updates = { $pull: { downvotes: id } };
        } else {
          updates = { $push: { downvotes: id } };
        }
        return Question.findByIdAndUpdate(questionId, updates, { new: true }).exec()
      })
      .then(question => {
        return Question.populate(question, { path: "downvotes" });
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
}

module.exports = QuestionController;
