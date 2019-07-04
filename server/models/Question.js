const mongoose = require('mongoose');
const {Schema} = mongoose;

const questionSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    upvote : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    downvote : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    answers : [{
        type : Schema.Types.ObjectId,
        ref : 'Answer'
    }]

},{
    timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question