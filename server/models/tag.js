const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema} = mongoose;

const tagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true
    }
}, {timestamps: true});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag