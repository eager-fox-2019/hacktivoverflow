const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema= new Schema({
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
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }  
},{timestamps: true})

let Question = mongoose.model('Question', questionSchema)

module.exports= Question