const Answer = require("../models/answer.js");

class AnswerController {
  static create(req, res, next) {
    console.log(req.body);
    let id = req.decoded.id;
    let questionId = req.params.questionId;
    let newAnswer = {
      title: req.body.title,
      comment: req.body.comment,
      upvotes: [],
      downvotes: [],
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
  static read(req, res, next) {
    let myAnswer = req.query.myAnswer;
    let id = req.decoded.id;
    let questionId = req.params.questionId;
    let userAnswer = {
      UserId: id,
      QuestionId: questionId
    };
    if (!myAnswer) delete userAnswer.UserId;
    Answer.find(userAnswer)
      .populate("QuestionId")
      .populate("UserId")
      .populate("upvotes")
      .populate("downvotes")
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
  static update(req, res, next) {
    console.log(req.body)
    let id = req.params.id;
    let input = req.body;
    let update = {};
    for (let keys in input) {
      update[keys] = req.body[keys];
    }
    console.log(update)
    Answer.findByIdAndUpdate(id, { $set: update }, { new: true })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
  static delete(req, res, next) {
    let id = req.params.id;
    Answer.deleteOne({
      _id: id
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
  static upvote(req, res, next) {
    let id = req.decoded.id;
    let answerId = req.params.id;
    Answer.findById(answerId)
      .populate("UserId")
      .then(answer => {
        let order = {};
        if (answer.upvotes.includes(id)) {
          order = { $pull: { upvotes: id } };
          return Answer.findByIdAndUpdate(answerId, order, { new: true });
        } else if (answer.downvotes.includes(id)) {
          order = { $pull: { downvotes: id } };
          return Answer.findByIdAndUpdate(answerId, order, { new: true })
            .then(result => {
              return Answer.findByIdAndUpdate(
                answerId,
                { $push: { upvotes: id } },
                { new: true }
              );
            })
            .catch(next);
        } else {
          return Answer.findByIdAndUpdate(
            answerId,
            { $push: { upvotes: id } },
            { new: true }
          );
        }
      })
      .then(answer => {
        return Answer.populate(answer, { path: "upvotes" });
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
  static downvote(req, res, next) {
    let id = req.decoded.id;
    let answerId = req.params.id;
    Answer.findById(answerId)
      .populate("UserId")
      .then(answer => {
        let order = {};
        if (answer.upvotes.includes(id)) {
          order = { $pull: { upvotes: id } };
          return Answer.findByIdAndUpdate(answerId, order, { new: true })
            .then(result => {
              return Answer.findByIdAndUpdate(
                answerId,
                { $push: { downvotes: id } },
                { new: true }
              );
            })
            .catch(next);
        } else if (answer.downvotes.includes(id)) {
          order = { $pull: { downvotes: id } };
          return Answer.findByIdAndUpdate(answerId, order, { new: true });
        } else {
          return Answer.findByIdAndUpdate(
            answerId,
            { $push: { downvotes: id } },
            { new: true }
          );
        }
      })
      .then(answer => {
        return Answer.populate(answer, { path: "downvotes" });
      })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(next);
  }
}

module.exports = AnswerController;
