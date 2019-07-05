const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  title: String,
  comment: String,
  created_at: Date,
  QuestionId: {
    type: Schema.Types.ObjectId, ref: 'Question'
  },
  UserId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  upvotes: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
})

module.exports = mongoose.model('Answer', AnswerSchema);