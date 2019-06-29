const mongoose = require('mongoose')

const {
  Schema
} = mongoose
const answerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  desc: String,
  upvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{ type: Schema.Types.ObjectId, ref: 'User'}]
})
const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer