const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
  user: `${process.env.GOOGLE_EMAIL}`, // generated ethereal user
  pass: `${process.env.GOOGLE_PASS}`} // generated ethereal password
})

module.exports = transporter
