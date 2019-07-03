const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  upvotes: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  downvotes: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }
});

let questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;