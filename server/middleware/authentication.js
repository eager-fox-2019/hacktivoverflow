require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.headers.hasOwnProperty('token')) {
        try {
            const decoded = jwt.verify(req.headers.token, process.env.SECRET)
            req.decoded = decoded.payload
            next()
        } catch (err) {
            res.status(500).send({
                message: 'Token is not valid'
            })
        }
    }
    else {
        res.status(401).send({ message: 'Unauthorized, you must login first' })
    }
}