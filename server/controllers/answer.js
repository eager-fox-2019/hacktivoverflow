const Answer = require('../models/answer')

class AnswerCont {
  static create(req, res, next) {
    if (!req.body.title) {
      next({
        code: 400,
        message: 'Answer must have a title!'
      })
    } else {
      if (req.body.title.length == 0) {
        next({
          code: 400,
          message: 'Answer must have a title!'
        })
      } else {
        if (!req.body.desc) {
          next({
            code: 400,
            message: 'Answer must have description!'
          })
        } else {
          if (req.body.desc.length == 0) {
            next({
              code: 400,
              message: 'Answer must have description!'
            })
          } else {
            let newAnswer = {
              user: req.decoded._id,
              title: req.body.title,
              desc: req.body.desc,
              upvote: [],
              downvote: []
            }
            Answer.create(newAnswer)
              .then(answer => {
                res.status(201).json(answer)
              })
              .catch(next)
          }
        }
      }
    }
  }

  static list(req, res, next) {
    Answer.find({}).populate({
      path: 'user',
      select: 'name'
    }).exec(function (err, answers) {
      if (err) {
        next({
          code: 500,
          message: err.message
        })
      } else {
        if (answers) {
          res.status(200).json(answers)
        } else {
          res.status(200).json([])
        }
      }
    })
  }

  static detail(req, res, next) {
    Answer.findById(req.params.id).exec(function (err, answer) {
      if (err) {
        next({
          code: 500,
          message: err.message
        })
      } else {
        if (answer) {
          res.status(200).json(answer)
        } else {
          next({
            code: 404,
            message: `Answer with id ${req.params.id} not found!`
          })
        }
      }
    })
  }

  static updateDetail(req, res, next) {
    Answer.findById(req.params.id, (err, answer) => {
      if (err) {
        next({
          code: 500,
          message: err.message
        })
      } else {
        if (answer) {
          if (req.body.title){
            if (req.body.title.length == 0) {
              next({
                code: 400,
                message: 'Answer must have a title!'
              })
            } else {
              if (req.body.desc) {
                if (req.body.desc.length == 0) {
                  next({
                    code: 400,
                    message: 'Answer must have description!'
                  })
                } else {
                  answer.title = req.body.title
                  answer.desc = req.body.desc
                  answer.save()
                    .then(answer => {
                      res.status(200).json(answer)
                    })
                    .catch(next)
                }
              } else {
                answer.title = req.body.title
                answer.save()
                  .then(answer => {
                    res.status(200).json(answer)
                  })
                  .catch(next)
              }
            }
          } else {
            if (req.body.desc) {
              if (req.body.desc.length == 0) {
                next({
                  code: 400,
                  message: 'Answer must have description!'
                })
              } else {
                answer.desc = req.body.desc
                answer.save()
                  .then(answer => {
                    res.status(200).json(answer)
                  })
                  .catch(next)
              }
            } else {
              answer.save()
                .then(answer => {
                  res.status(200).json(answer)
                })
                .catch(next)
            }
          }
        } else {
          next({
            code: 404,
            message: `Answer with id ${req.params.id} not found!`
          })
        }
      }
    })
  }

  static updateNonDetail(req, res, next) {
    Answer.findById(req.params.id, (err, answer) => {
      if (err) {
        next({
          code: 500,
          message: err.message
        })
      } else {
        if (answer) {
          answer.upvote = req.body.upvote
          answer.downvote = req.body.downvote
          answer.save()
            .then(answer => {
              res.status(200).json(answer)
            })
            .catch(next)
        } else {
          next({
            code: 404,
            message: `Answer with id ${req.params.id} not found!`
          })
        }
      }
    })
  }

  static delete(req, res, next) {
    Answer.deleteOne({
        _id: req.params.id
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
}

module.exports = AnswerCont