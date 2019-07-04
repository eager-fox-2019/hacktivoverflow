const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: [15, 'Please be descriptive, put at least 15 characters!']
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},{timestamps: true})

let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer