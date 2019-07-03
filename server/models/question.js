const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upvote:[{
        type:Schema.Types.ObjectId,
        ref: "User",
    }],
    downvote:[{
        type:Schema.Types.ObjectId,
        ref: "User",
    }],
    tags : [String],
    answerId:[{
        type: Schema.Types.ObjectId,
        ref: "Answer"
    }],
    userId : { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question
