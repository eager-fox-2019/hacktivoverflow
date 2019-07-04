const mongoose = require("mongoose")
const encrypt = require("../helpers/encrypt.js")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title cannot be empty"]
    },
    description: {
        type: String,
        required: [true, "description cannot be empty"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "author cannot be empty"]
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}],
    upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    downvotes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true})


module.exports = mongoose.model("Post", postSchema)