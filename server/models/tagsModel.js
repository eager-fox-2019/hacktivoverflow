const mongoose = require('mongoose')

let tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, `Tag Needed`]
    },
    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }]
})

let Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag