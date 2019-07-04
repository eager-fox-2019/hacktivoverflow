mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    title: String,
    description: String,
    upvotes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    downvotes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    creator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'}
})

const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question