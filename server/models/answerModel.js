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
    upvotes: [{
        type: ObjectId,
        ref: 'User',
    }],
    downvotes: [{
        type: ObjectId,
        ref: 'User',
    }],
    questionId: {
        type: ObjectId,
        ref: 'Question',
    },
    author: {
        type: ObjectId,
        ref: 'User',
    }
}, { timestamps: true })

// answerSchema.pre('save', function(next){
//     next()
// })

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer