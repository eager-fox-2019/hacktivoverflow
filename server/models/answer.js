const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
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
  upvotes: [ { type: Schema.Types.ObjectId, ref: 'User'} ],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }
})

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer