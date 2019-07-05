const mongoose = require('mongoose')
const { hash } = require('../helpers/bcryptjs')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, `Required Username`],
        validate: [{
            validator: function (val) {
                return new Promise ( (resolve, reject)=> [
                    User.findOne({
                        username: val
                    })
                    .then((found) => {
                        if (found) {
                            resolve(false)
                        }
                        else {
                            resolve (true)
                        }
                    })
                    .catch((err) => [
                        console.log(err)
                    ])
                ])
            },
            message: `Username has been used`
        }]
    },
    email: {
        type: String,
        required: [true, `Email required`],
        validate: [{
            validator: function (val) {
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
                    throw (`Invalid email format`)
                }
            },
            message: `Invalid email format`
        }, {
            validator: function (val) {
                return new Promise ((resolve, reject)=> [
                    User.findOne({
                        email: val
                    })
                    .then((found) => {
                        if (found) {
                            resolve (false)
                        } else {
                            resolve (true)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                ])    
            },
            message: `Email has been used/ exist`
        }]
    },
    password: {
        type: String,
        required: [true, `Password required`],
        minlength: [6, `Password too short`]
    },
    createdAt: Date,
    updatedAt: Date
})

userSchema.pre('save',function(next){
    this.password = hash((this.password))
    next()
})

let User = mongoose.model('User', userSchema)

module.exports = User
