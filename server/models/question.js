mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    title: String,
    description: String,
    category: String,
    created_at: Date,
    upvotes: [ { type: Schema.Types.ObjectId, ref: 'User' }  ],
    downvotes: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
    UserId: { type: Schema.Types.ObjectId, ref: 'User'}
})

let Question = mongoose.model('Question', QuestionSchema)

module.exports = Question