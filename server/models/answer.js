mongoose = require('mongoose')

const AnswerSchema = new mongoose.Schema({
    title:String,
    description:String,
    upvotes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    downvotes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    question: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question'},
    creator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'}
})

const Answer = mongoose.model('Answer', AnswerSchema)
module.exports = Answer