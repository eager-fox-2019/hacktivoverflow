const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: String,
  description: String,
  tags: Array,
  created_at: Date,
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

module.exports = mongoose.model('Question', QuestionSchema);