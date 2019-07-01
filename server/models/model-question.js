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

questionSchema.pre('remove', function(next) {
  let Answer = this.model('Answer')
  Answer.remove({ question_id: this._id }).exec();
  next()
})

var Question = mongoose.model('Question', questionSchema);

module.exports = Question