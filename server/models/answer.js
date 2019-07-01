const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema= new Schema({
    title:{
        type: String,
        required: [true, 'Title required']
    },
    description:{
        type: String,
        required: [true, 'Description required']
    },
    upvotes:[
        { type: Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
    downvotes:[
        { type: Schema.Types.ObjectId,
          ref: 'User'
        }
    ],
    questionId:{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }  
},{timestamps: true})

let Answer = mongoose.model('Answer', answerSchema)

module.exports= Answer