const mongoose = require('mongoose');
const {Schema} = mongoose;

const answerSchema = new Schema({
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
    }
}, {
    timestamps : true
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer