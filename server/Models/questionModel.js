var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let questionSchema = new Schema({
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
    answer : [{
        type: Schema.Types.ObjectId, 
        ref: 'Answers'
    }],
    userId : { type: Schema.Types.ObjectId, ref: 'Users' }
})

let Question = mongoose.model('Questions', questionSchema)

module.exports = Question