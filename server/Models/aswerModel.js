var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let answerSchema = new Schema({
    title : String,
    description : String,
    upvotes : {
        type : Array,
        default : []
    },
    downvotes : {
        type : Array,
        default : []
    },
    userId : { type: Schema.Types.ObjectId, ref: 'Users' }
})

let Answer = mongoose.model('Answers', answerSchema)

module.exports = Answer