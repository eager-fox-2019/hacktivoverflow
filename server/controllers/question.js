const Model = require('../models');

class Question {

  static create(req, res, next) {
    let questionObj = {
      title: req.body.title,
      description: req.body.description,
      upvotes: [],
      downvotes: [],
      answers: [],
      author: req.decode._id
    }
    Model.Question.create(questionObj)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        next(err);
      })
  }

  static readAll(req, res, next) {
    Model.Question.find({})
      .populate({
        path: 'answers',
        populate: {
          path: 'author',
          model: 'User'
        }
      })
      .populate('author')
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      })
  }

  static update(req, res, next) {
    let questionObj = {};

    if (req.body.title) {
      questionObj['title'] = req.body.title;
    }

    if (req.body.description) {
      questionObj['description'] = req.body.description;
    }

    if (req.body.upvotes.length > -1) {
      questionObj['upvotes'] = req.body.upvotes;
    }

    if (req.body.downvotes.length > -1) {
      questionObj['downvotes'] = req.body.downvotes;
    }

    if (req.body.answers.length > -1) {
      questionObj['answers'] = req.body.answers;
    }

    Model.Question.updateOne({
        _id: req.params.questionId
      }, questionObj)
      .then((response) => {
        res.status(200).json(response)
      })
      .catch((err) => {
        next(err);
      })
  }

  static delete(req, res, next) {
    
    Model.Question.deleteOne({
      _id: req.params.questionId
    })
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      next(err);
    })
  }
}

module.exports = Question