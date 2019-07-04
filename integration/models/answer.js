const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const answerSchema = new mongoose.Schema({
    description:{
        type: String,
        required: [true, "Answer description is empty"]
    },
    author: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    question: {
        type: ObjectId,
        ref: "Question"
    },
    upvotes: {
        type: [{ type: ObjectId, ref: "User"}]
    },
    downvotes: {
        type: [{ type: ObjectId, ref: "User"}]
    }

}, { timestamps: true })

module.exports = mongoose.model("Answer", answerSchema)