const Question = require('../models/question')

class QuestionCont {
  static create(req, res, next) {
    if (!req.body.title) {
      next({
        code: 400,
        message: 'Question must have a title!'
      })
    } else {
      if (req.body.title.length == 0) {
        next({
          code: 400,
          message: 'Question must have a title!'
        })
      } else {
        if (!req.body.desc) {
          next({
            code: 400,
            message: 'Question must have description!'
          })
        } else {
          if (req.body.desc.length == 0) {
            next({
              code: 400,
              message: 'Question must have description!'
            })
          } else {
            let newQuestion = {
              user: req.decoded._id,
              title: req.body.title,
              desc: req.body.desc,
              upvote: [],
              downvote: [],
              answer: [],
              created_at: new Date()
            }
            Question.create(newQuestion)
              .then(question => {
                res.status(201).json(question)
              })
              .catch(next)
          }
        }
      }
    }
  }

  static list(req, res, next) {
    Question.find({}).populate({
      path: 'user'
    }).exec(function (err, questions) {
      if (err) {
        next({
          code: 500,
          message: err.message
        })
      } else {
        if (questions) {
          res.status(200).json(questions)
        } else {
          res.status(200).json([])
        }
      }
    })
  }

  static detail(req, res, next) {
    Question.findById(req.params.id)
    .populate({
      path: 'user'
    })
    .exec(function (err, question) {
      if (err) {
        next({
          code: 500,
          message: err.message
        })
      } else {
        if (question) {
          res.status(200).json(question)
        } else {
          next({
            code: 404,
            message: `Question with id ${req.params.id} not found!`
          })
        }
      }
    })
  }

  static updateDetail(req, res, next) {
    Question.findById(req.params.id, (err, question) => {
      if (err) {
        next({
          code: 500,
          message: err.message
        })
      } else {
        if (question) {
          if (req.body.title){
            if (req.body.title.length == 0) {
              next({
                code: 400,
                message: 'Question must have a title!'
              })
            } else {
              if (req.body.desc) {
                if (req.body.desc.length == 0) {
                  next({
                    code: 400,
                    message: 'Question must have description!'
                  })
                } else {
                  question.title = req.body.title
                  question.desc = req.body.desc
                  question.save()
                    .then(question => {
                      res.status(200).json(question)
                    })
                    .catch(next)
                }
              } else {
                question.title = req.body.title
                question.save()
                  .then(question => {
                    res.status(200).json(question)
                  })
                  .catch(next)
              }
            }
          } else {
            if (req.body.desc) {
              if (req.body.desc.length == 0) {
                next({
                  code: 400,
                  message: 'Question must have description!'
                })
              } else {
                question.title = req.body.title
                question.desc = req.body.desc
                question.save()
                  .then(question => {
                    res.status(200).json(question)
                  })
                  .catch(next)
              }
            } else {
              question.save()
                .then(question => {
                  res.status(200).json(question)
                })
                .catch(next)
            }
          }
        } else {
          next({
            code: 404,
            message: `Question with id ${req.params.id} not found!`
          })
        }
      }
    })
  }

  static updateNonDetail(req, res, next) {
    Question.findById(req.params.id, (err, question) => {
      if (err) {
        next({
          code: 500,
          message: err.message
        })
      } else {
        if (question) {
          if (req.body.upvote){
            question.upvote = req.body.upvote
          }
          if (req.body.downvote){
            question.downvote = req.body.downvote
          }
          if (req.body.answer){
            question.answer = req.body.answer
          }
          question.save()
            .then(question => {
              res.status(200).json(question)
            })
            .catch(next)
        } else {
          next({
            code: 404,
            message: `Question with id ${req.params.id} not found!`
          })
        }
      }
    })
  }

  static delete(req, res, next) {
    Question.deleteOne({
        _id: req.params.id
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = QuestionCont