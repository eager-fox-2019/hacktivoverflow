mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    title: String,
    comment: String,
    created_at: String,
    upvotes: [ { type: Schema.Types.ObjectId, ref: 'User'} ],
    downvotes: [ { type: Schema.Types.ObjectId, ref: 'User'} ],
    QuestionId: { type: Schema.Types.ObjectId, ref: 'Question'},
    UserId: { type: Schema.Types.ObjectId, ref: 'User'}
})

let Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer