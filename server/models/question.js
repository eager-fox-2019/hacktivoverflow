const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const ModelSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
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

const Model = mongoose.model('Questions', ModelSchema)
module.exports = Model