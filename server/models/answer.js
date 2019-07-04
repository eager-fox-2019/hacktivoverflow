const mongoose = require('mongoose')
const Question = require('./question')

let Schema = mongoose.Schema

let answer = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    title: {
        type: String,
        required: [true, 'Title cannot be empty']
    },
    desc: {
        type: String,
        required: [true, 'Description cannot be empty']
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

answer.pre('save', function(next){
    let data = {
        $push : {
            answers: this._id
        }
    }
    Question.findByIdAndUpdate(this.questionId, data, {new: true})
    .then(resp => {
        console.log('data question di answer', resp)
        next()
    })
    .catch(err => {
        console.log('error do model answer', err)
    })
})

let Answer = mongoose.model('Answer', answer)

module.exports = Answer