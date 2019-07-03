const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

let answerModel = mongoose.model('Answer', answerSchema);

module.exports = answerModel;