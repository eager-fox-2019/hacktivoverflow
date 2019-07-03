const {verify} = require('../helpers/jwt')
const User = require('../models/user')

module.exports = (req, res, next) => {
    if (req.headers.token) {
        req.decoded = verify(req.headers.token)
        User.findOne({
                _id: req.decoded.id
            })
            .then(user => {
                if (user) {         
                    next()
                } else {
                    throw({
                        status: 401,
                        message: "Unauthorized"
                    })
                }
            })
            .catch(next)
    } else {
        throw({
            status: 401,
            message: 'You have to login first'
        })
    }
}