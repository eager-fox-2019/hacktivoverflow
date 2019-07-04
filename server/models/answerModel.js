const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const answerSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']        
    },
    description: {
        type: String,
        required: [true, 'Title is required']        
    },
    upvotes: Number,
    downvotes: Number,
    questionId: {
        type: ObjectId,
        ref: 'Question',
    },
    author: {
        type: ObjectId,
        ref: 'User',
    }
}, { timestamps: true })

answerSchema.pre('save', function(next){
    this.upvotes = 0
    this.downvotes = 0
    next()
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer