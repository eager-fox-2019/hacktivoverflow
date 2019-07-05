const mongoose = require('mongoose')

let answerSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: [true, `Title needed`]
    },
    description: {
        type: String,
        required: [true, `Description needed`]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    upVote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    downVote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }
},{
    timestamps: true
})

// answerSchema.set('timestamps', true)
let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer