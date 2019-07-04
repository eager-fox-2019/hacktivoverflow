const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Provide Title']
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const Question = new mongoose.model('Question', questionSchema)

module.exports = Question