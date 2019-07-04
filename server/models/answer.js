const mongoose = require('mongoose')
const Question = require('./question')

let answerSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'Question'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'User'
  },
  upVotes: [{
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'User'
  }],
  downVotes: [{
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'User'
  }]
},{ timestamps: true })

answerSchema.post('save', function( doc, next ){
  return Question.findOneAndUpdate({ _id: this.questionId }, { $push: { answers: this._id } }, { new:true })
  .then(data => {
    next()
  })
  .catch(err => {
    throw({ code: '404', message: "Bad request" })
  })
})
let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer