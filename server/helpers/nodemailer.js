const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: `${process.env.GOOGLE_EMAIL}`,
         pass: `${process.env.GOOGLE_PASS}`
     }
})

module.exports = transporter