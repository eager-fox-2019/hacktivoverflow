const mongoose = require("mongoose");
const { hash } = require('../helpers/bcrypt.js');
const Schema = mongoose.Schema;
const UserSchema = new Schema({

  username : {
    type : String,
    required : [true , 'username is required'],
    validate : {
      validator : function(value){
        return User.find({
          _id: { $ne: this._id },
          username: value
        })
        .then( data => {
            if (data.length !== 0) {
                throw 'username has been used'
            }
        })
        .catch(err => {
            throw err
        });
      }
    }
  },
  email: 
  {
    type: String,
    required: [ true, 'Email is required' ],
    validate: [{
      validator: function(input) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return input.match(mailformat)
      },
      message: props => `${props.value} invalid email format!`
    }, {
      validator: function(value) {
        return User.find({
              _id: { $ne: this._id },
              email: value
          })
          .then( data => {
              if (data.length !== 0) {
                  throw 'Email has been used'
              }
          })
          .catch(err => {
              throw err
          });
      },
      message: props => `This email ${props.value} already used!`
    }], 
  }
  ,
  password: {
    type: String,
    required: [ true, 'Password is required' ],
    validate: {
      validator: function(input) {
        if (input.length > 4 && input.length < 11) return true
        else return false
      },
      message: props => `Password length must be between 5 to 10`
    }
  },
  watchedTags : {
    type : Array
  }
});

UserSchema.pre('save', function (next){
  this.password = hash(this.password)
  next()
})

const User = mongoose.model("user", UserSchema);
// UserId: { type: Schema.Types.ObjectId, ref: 'User'}

module.exports = User;