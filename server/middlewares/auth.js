const User = require('../models/user');
const tk = require('../helpers/token');
const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports = {
  Authenticate: (req, res, next) => {
    if(req.headers.token) {
      try {
        const decoded = tk.verify(req.headers.token);
        User.find({ email: decoded.email })
          .then(users => {
            if(users.length > 0) {
              req.decoded = decoded;
              next()
            } else {
              next({ status: 403, msg: 'Unauthorized' })
            }
          })
          .catch(next)
      }
      catch (err) {
        next({ status: 401, msg: 'Authentication failed' })
      }
    } else {
      next({ status: 401, msg: 'Authentication failed' })
    }
  },
  AuthorizeQues: (req, res, next) => {
    let id = req.params.questionId;
    Question.findById(id)
      .then(question => {
        if (question.UserId.toString() == req.decoded.id) {
          next();
        } else {
          throw { status: 403, msg: 'Unauthorized' };
        }
      })
      .catch(next);
  },
  AuthorizeAns: (req, res, next) => {
    let id = req.params.id;
    Answer.findById(id)
      .then(answer => {
        if (answer.UserId.toString() == req.decoded.id) {
          next();
        } else {
          throw { status: 403, msg: 'Unauthorized' };
        }
      })
      .catch(next);
  }
};
