const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
  answeredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
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

let Question = mongoose.model('Question', questionSchema)

module.exports = Question