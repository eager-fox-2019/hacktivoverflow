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

  static update(req, res, next) {
    let answerObj = {};
    
    if (req.body.title) {
      answerObj['title'] = req.body.title;
    }

    if (req.body.description) {
      answerObj['description'] = req.body.description;
    }

    if (req.body.upvotes.length > -1) {
      answerObj['upvotes'] = req.body.upvotes;
    }

    if (req.body.downvotes.length > -1) {
      answerObj['downvotes'] = req.body.downvotes;
    }

    Model.Answer.updateOne({
        _id: req.body._id
      }, answerObj)
      .then((response) => {
        res.status(200).json(response)
      })
      .catch((err) => {
        next(err);
      })
  }
}

module.exports = Answer