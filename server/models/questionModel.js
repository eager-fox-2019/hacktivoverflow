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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    }],
    tags: [{
        type: String,
        ref: 'Tag'
    }]
}, {
    timestamps: true
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question