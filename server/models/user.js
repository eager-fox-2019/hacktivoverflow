const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pwHelper = require('../helpers/password');

const userSchema = new Schema({
  name: {
    type: String,
    required: [ true, 'name is required' ],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      "invalid format",
    ],
    validate: {
      validator: function(v) {
        return new Promise(function(resolve, reject) {
          mongoose.model('User', userSchema).findOne({ email: v })
          .then(user => {
            if(user) {
              resolve(false)
            }
            resolve(true)
          })
        })
      },
      message: "not unique",
    }
  },
  password: {
    type: String,
    required: [ true, 'password is required' ],
  },
});

userSchema.pre('save', function(next) {
  if(this.isNew) {
    this.password = pwHelper.hash(this.password);
    console.log('password hashed!')
  }
  next();
});

module.exports = mongoose.model('User', userSchema);