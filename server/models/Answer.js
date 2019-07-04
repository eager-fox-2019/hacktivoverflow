let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let answerSchema = new Schema({
    content: {
        type: String,
        required : true,
    },
    UserId: {
        type : Schema.Types.ObjectId,
        ref : "User"
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

let Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer