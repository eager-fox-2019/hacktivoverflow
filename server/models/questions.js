const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  content: String,
  upvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  createdAt: {type: Date, default: Date.now} 
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question