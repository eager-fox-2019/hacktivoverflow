const mongoose = require('mongoose')

const Schema = mongoose.Schema
const answerSchema = new Schema({
    createdAt: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    title: String,
    body: String

})
const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer