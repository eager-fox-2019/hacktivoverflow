const mongoose = require('mongoose')

let questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, `Title is required.`],
  },
  description: {
    type: String,
    required: [true, `Description is required.`],
  },
  downVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  upVotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags : [Object],
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer'
  }],
},{ timestamps: true })

let Question = mongoose.model('Question', questionSchema)

module.exports = Question
