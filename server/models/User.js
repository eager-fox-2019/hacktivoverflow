const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: [true, "email cannot be empty"],
        validate: {
            validator: async function () {
                console.log(this);
                let check = await User.findOne({
                    email: this.email,
                    _id: {
                        $ne: this._id
                    }
                })
                if (check) return false
                else return true
            },
            message: "email already registered"
        }
    },
    password: String,
    image: String,
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question"
    }],
    interest: Array
})

userSchema.pre('save', async function (next) {
    let user = await User.findById(this._id)
    if (user) {
        next()
    } else {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(this.password, salt)
        this.password = hash
        next()
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User