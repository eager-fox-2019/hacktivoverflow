'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  title: String,
  content: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  question_id: { type: Schema.Types.ObjectId, ref: 'Question' },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, {timestamps: true});

// answerSchema.pre('remove', function(next) {
//   let Question = this.model('Question')
//   console.log('ini question id', this.question_id)
//   return Question.findById(this.question_id)
//     .then((question) => {
//       console.log('ini question di model answer', question)
//       question.answers = question.answers.filter((answer) => {
//         if (answer._id === this._id) {
//           return false
//         } else {
//           return true
//         }
//       })
//       return question.save()
//     })
//     .then((result) => {
//       console.log('ini result di model answer', result)
//       next()
//     })
//     .catch(next)
// })

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer