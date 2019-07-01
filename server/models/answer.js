const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    description:  {
        type: String,
        required: [true, 'Answer required!']
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true})

const Answer = mongoose.model('Answer', AnswerSchema)
module.exports = Answer