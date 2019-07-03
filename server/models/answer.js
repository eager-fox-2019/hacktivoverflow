const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: "Users",
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: "Users",
  }]
})

const Model = mongoose.model('Answers', ModelSchema)
module.exports = Model