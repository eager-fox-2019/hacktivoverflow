'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  title: String,
  content: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  question_id: { type: Schema.Types.ObjectId, ref: 'Question' },
  votes: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    voteType: String
  }],
}, {timestamps: true});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer