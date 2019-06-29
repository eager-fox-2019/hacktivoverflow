const mongoose = require('mongoose')

const {
  Schema
} = mongoose
const questionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  desc: String,
  upvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  answer: [{ type: Schema.Types.ObjectId, ref: 'Answer'}]
})
const Question = mongoose.model('Question', questionSchema)
module.exports = Question