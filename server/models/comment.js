const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: String,
    desc: String,
    upvotes: Array,
    downvotes: Array,
    userId: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
}, {timestamps : true});

const comments = mongoose.model('comments', CommentSchema);
module.exports = comments