mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    subject: String,
    description: String,
    upvotes: [ { type: Schema.Types.ObjectId, ref: 'User' }  ],
    downvotes: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
    UserId: { type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: Date,
})

let Question = mongoose.model('Question', QuestionSchema)

module.exports = Question