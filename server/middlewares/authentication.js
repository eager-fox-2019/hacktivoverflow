const Helper = require('../helpers/helper')
const User = require('../models/user')

module.exports = (req, res, next) => {
    try {
        req.decoded = Helper.verifyJWT(req.headers.token)
        User.findOne({ _id: req.decoded._id })
            .then(user => {
                if (user) {
                    next()
                } else {
                    console.log(`unauth?`);
                    res.status(401).json("Unautheticated")
                }
            })
    } catch (err) {
        res.status(500).json(err)
    }
}