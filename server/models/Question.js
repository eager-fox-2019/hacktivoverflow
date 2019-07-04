const mongoose = require('mongoose')
const Schema = mongoose.Schema
const questionSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Date,
    title: String,
    body: String,
    solved: false,
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: "Answer"
    }],
    tags: {
        type: Array,
    }
})
const Question = mongoose.model('Question', questionSchema)

module.exports = Question