const mongoose = require("mongoose");
const bcrypt = require('../helpers/bcrypt.js');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [ true, 'Name is required' ],
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],
        validate: [{
        validator: function(input) {
            let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return input.match(format)
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
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ],
        validate: {
        validator: function(input) {
            if (input.length > 3 && input.length < 9) return true
            else return false
        },
        message: props => `Password length must be between 4 to 8`
        }
    }
});

UserSchema.pre('save', function (next){
  this.password = bcrypt.encrypt(this.password)
  next()
})

let User = mongoose.model("User", UserSchema);

module.exports = User;