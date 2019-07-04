var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let {hashPassword} = require('../Helpers/crypt')

let userSchema = new Schema({
    username : String,
    password : String,
    email : String
})

userSchema.pre('save', function(next){
    // console.log('shit!')
    // this.password = bcrypt.hashSync(this.password, salt)
    // next()
    this.password = hashPassword(this.password)
    next()
})

let User = mongoose.model('Users', userSchema)

module.exports = User