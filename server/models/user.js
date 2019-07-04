const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {
        type: String,
        validate: [
            {
                validator: function (email) {
                    return new Promise(function (resolve, reject) {
                        User.findOne({ email: email })
                        .then(result => {
                            if (result) {
                                resolve(false)
                            } else {
                                resolve(true)
                            }
                        })
                        .catch( (err) => {
                            reject(err)
                        })
                    })
                },
                message: props => `Email -> ${props.value} <- already taken`
            }, {
                validator: function validateEmail(email) {
                    var regex = /\S+@\S+\.\S+/;
                    return regex.test(email);
                },
                message: props => `Email -> ${props.value} <- is not valid`
            }
        ]
    }
})

UserSchema.pre('save', function (next) {
    let user = this
    let salt = bcrypt.genSaltSync(10)
    var hashedPassword = bcrypt.hashSync(user.password, salt)
    user.password = hashedPassword
    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User