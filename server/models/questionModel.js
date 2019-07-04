const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const questionSchema = new Schema({
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
    answers: [{
        type: ObjectId,
        ref: 'Answer',
    }],
    author: {
        type: ObjectId,
        ref: 'User',
    },
    tags: []
}, { timestamps: true })

questionSchema.pre('save', function(next){
    this.answers = []
    next()
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question