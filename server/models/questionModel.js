const mongoose = require('mongoose')

let questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, `Tittle is required`]
    },
    description: {
        type: String,
        required: [true, `Description is requried`]
    },
    upVote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    userId: {
        type: String,
        ref: 'User'
    },
    Answer: [{
        type: String,
        ref: 'Answer',
    }],
    Tags: [{
        type: String,
        ref: 'Tag'
    }]
}, {
    timestamps: true
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question