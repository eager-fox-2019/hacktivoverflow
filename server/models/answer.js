const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
    title       : {
        type : String,
        required : [true , 'title is required']
    },
    description : {
        type : String,
        required : [true , 'description is required']
    },
    userId      : {
        type : String,
        required : [true , 'userId is required']
    },
    questionId : {
        type : String,
        required : [true, 'questionId is required']
    },
    upVotes: [{type: Schema.Types.ObjectId, ref : 'user'}],
    downVotes : [{type: Schema.Types.ObjectId, ref : 'user'}]
})

let Answer = mongoose.model('answer',answerSchema)

module.exports = Answer