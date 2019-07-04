const jwt = require("../helpers/jwt.js");
const User = require("../models/user.js");
const Question = require("../models/question.js");
const Answer = require("../models/answer.js");

module.exports = {
  Authentication: function(req, res, next) {
    let token = req.headers.token;
    let decoded = null;
    try {
      decoded = jwt.verify(token);
    } catch (err) {
      throw {
        code: 401,
        message: 'Permission Denied (Not Authenticated)'
      };
    }
    User.findOne({
      email: decoded.email
    })
      .then(user => {
        if (user) {
          req.decoded = decoded;
          next();
        } else {
          throw {
            code: 401,
            message: 'Invalid User Credentials'
          };
        }
      })
      .catch(next);
  }, 
};
