'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  title: String,
  content: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  votes: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    voteType: String
  }],
  image_url: String,
}, {timestamps: true});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question