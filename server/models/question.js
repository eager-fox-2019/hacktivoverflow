const mongoose = require('mongoose')

let Schema = mongoose.Schema
const questionSchema = new Schema({
    title: {
        type: String,
        required: [true,'title is required']
    },
    description: {
        type: String,
        required: [true,'description is required']
    },
    user_id : {type: Schema.Types.ObjectId, ref: 'User'},
    upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes:[{ type: Schema.Types.ObjectId, ref: 'User'}],
},{timestamps : true})

const Question = mongoose.model('Question',questionSchema)

module.exports = Question