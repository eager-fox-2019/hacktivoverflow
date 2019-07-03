let clearDb = {}
const Models = require('../models/index.js')
const { User, Question, Answer } = Models

clearDb.clearUser = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    return User
      .deleteMany()
  }
}

clearDb.clearQuestion = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    return Question
      .deleteMany()
  }
}

clearDb.clearAnswer = function() {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'testWin' ) {
    return Answer
      .deleteMany()
  }
}

module.exports = clearDb;
