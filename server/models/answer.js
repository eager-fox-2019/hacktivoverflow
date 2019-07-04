const mongoose = require('mongoose')

let Schema = mongoose.Schema
const asnwerSchema = new Schema({
    description: {
        type: String,
        required: [true,'description is required']
    },
    question_id: {type: Schema.Types.ObjectId, ref: 'Question'},
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes:[{ type: Schema.Types.ObjectId, ref: 'User'}],
},{timestamps : true})


const Answer = mongoose.model('Answer',asnwerSchema)

module.exports = Answer