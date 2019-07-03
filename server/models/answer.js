const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
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
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const Answer = new mongoose.model('Answer', answerSchema)

module.exports = Answer