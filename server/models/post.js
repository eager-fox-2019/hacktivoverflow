const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    desc: String,
    upvotes: Array,
    downvotes: Array,
    answer: Array,
    userId: {
        type: Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true});

const posts = mongoose.model('posts', PostSchema);
module.exports = posts