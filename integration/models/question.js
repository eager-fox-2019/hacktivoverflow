const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const questionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Question Title cannot be empty"],
        unique: [true, "Question has already been asked before"]
    },
    description:{
        type: String,
        required: [true, "Question description is empty"]
    },
    author: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    answers: {
        type: [{ type: ObjectId, ref: "Answer"} ]
    },
    upvotes: {
        type: [{ type: ObjectId, ref: "User"}]
    },
    downvotes: {
        type: [{ type: ObjectId, ref: "User"}]
    }

}, { timestamps : true })

module.exports = mongoose.model("Question", questionSchema)