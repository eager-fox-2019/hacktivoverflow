const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_HOST, // generated ethereal user
      pass: process.env.EMAIL_HOST_PASS // generated ethereal password
    }
})

module.exports = transporter