const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title:  {
        type: String,
        required: [true, 'Title required!']
    },
    description:  {
        type: String,
        required: [true, 'Description required!']
    },
    answer: [{
        type: Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true})

const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question