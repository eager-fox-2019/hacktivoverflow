const mongoose = require("mongoose")
const encrypt = require("../helpers/encrypt.js")
const Post = require("../models/post")

const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "description cannot be empty"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "author cannot be empty"]
    },
    post: {type: mongoose.Schema.Types.ObjectId, ref:"Post"},
    upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    downvotes: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, {timestamps: true})

// commentSchema.pre("deleteOne", function(next) {
//     console.log("MASUK", this.schema.paths.post)
//     Post.findOne({_id: this.post})
//     .then(found =>{
//         console.log(found, this.post, "+=========================")
//         var index = found.comments.indexOf(this._id)
//         console.log(index)
//         if(index !== -1) {
//             found.comments.splice(index, 1)
//         }
//         console.log(found)
//         return found.save()
//     })
//     .then(() =>{
//         next()
//     })
//     .catch(err =>{
//         throw err
//     })
// })

module.exports = mongoose.model("Comment", commentSchema)