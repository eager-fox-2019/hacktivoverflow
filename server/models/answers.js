const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
  content: String,
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer