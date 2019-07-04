const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashSync } = require('../helpers/hashPass')

function isEmail(email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email)
}

function isUnique(email) {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .then(row => {
        if (row)
          resolve(false)
        else
          resolve(true)
      })
      .catch(err => {
        reject(err)
      })
  })
}

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: [
      { validator: isUnique, msg: props => `${props.value} has been taken!` },
      { validator: isEmail, msg: props => `${props.value} is not a valid email!` }
    ],
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be more than equal 8 character!']
  },
  image_url: String,
  watchedTags: [String],
  reputation: {
    type: Number,
    default: 0
  }
  // questions: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Question'
  // }],
  // answers: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Answer'
  // }],
}, { timestamps: true })

userSchema.pre('save', function (next) {
  if(this.isNew)
    this.password = hashSync(this.password)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User