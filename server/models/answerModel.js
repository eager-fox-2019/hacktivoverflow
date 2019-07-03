const mongoose = require('mongoose')

let answerSchema = ({
    titel: {
        type: String
    },
    description: {
        type: String,
        reuired: [true, `Description needed`]
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
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }
})

// answerSchema.set('timestamps', true)
let Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer