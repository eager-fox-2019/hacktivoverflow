const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
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
    answerList  : [{type: Schema.Types.ObjectId, ref : 'answer'}],
    upVotes: [{type: Schema.Types.ObjectId, ref : 'user'}],
    downVotes : [{type: Schema.Types.ObjectId, ref : 'user'}]
})

let Question = mongoose.model('question',questionSchema)

module.exports = Question