let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let questionSchema = new Schema({
    content: {
        type: String,
        required : true,
    },
    UserId: {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    AnswerId: [{
        type : Schema.Types.ObjectId,
        ref : "Answer",
    }],
    title: {
        type : String,
        required : true,
    },
    category: {
        type : String,
        required : true,
    },
    upVote: [{
        type : Schema.Types.ObjectId,
        ref : "User",
    }],
    downVote: [{
        type : Schema.Types.ObjectId,
        ref : "User",
    }]
},{timestamps:true});

let Question = mongoose.model('Question', questionSchema);

module.exports = Question