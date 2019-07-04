const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  content: String,
  upvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  createdAt: {type: Date, default: Date.now}
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer