mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    title: String,
    description: String,
    QuestionId: { type: Schema.Types.ObjectId, ref: 'Question'},
    upvotes: [ { type: Schema.Types.ObjectId, ref: 'User'} ],
    downvotes: [ { type: Schema.Types.ObjectId, ref: 'User'} ],
    UserId: { type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: Date,
})

let Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer