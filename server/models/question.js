const mongoose = require('mongoose')

let Schema = mongoose.Schema

let question = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Title cannot be empty']
    },
    desc: {
        type: String,
        required: [true, 'Description cannot be empty']
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    answers: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }]
}, {
    timestamps: true
})

let Question = mongoose.model('Question', question)

module.exports = Question