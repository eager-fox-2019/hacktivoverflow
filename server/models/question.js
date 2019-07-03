const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSChema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  Answers: [ { type: Schema.Types.ObjectId, ref: 'Answer' } ]
})

const Question = mongoose.model('Question', QuestionSChema)

module.exports = Question