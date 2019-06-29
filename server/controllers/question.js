const Question = require("../models/question.js");

class QuestionController {
  static create(req, res, next) {
    let id = req.decoded.id;
    let newQuestion = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      upvotes: [],
      downvotes: [],
      created_at: new Date(),
      UserId: id
    };
    Question.create(newQuestion)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch(next);
  }
  static read(req, res, next) {
    let myQuestion = req.query.myQuestion;
    let search = req.query.search
    let id = req.decoded.id;
    let userQuestion = {
      _id: search,
      UserId: id
    };
    if (!myQuestion) delete userQuestion.UserId;
    if (!search) delete userQuestion._id;
    Question.find(userQuestion)
      .populate("UserId")
      .populate("upvotes")
      .populate("downvotes")
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
  static update(req, res, next) {
    let id = req.params.questionId;
    let input = req.body;
    let update = {};
    for (let keys in input) {
      update[keys] = req.body[keys];
    }
    Question.findByIdAndUpdate(id, { $set: update }, { new: true })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
  static delete(req, res, next) {
    let id = req.params.questionId;
    Question.deleteOne({
      _id: id
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
}

module.exports = QuestionController;
