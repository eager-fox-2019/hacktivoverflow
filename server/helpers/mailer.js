
const nodemailer = require("nodemailer");

function main(data ,done){

  let mail = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: process.env.email, 
      pass: process.env.password 
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Hacktiv-verflow " <hacktivoverflow-no-reply@yahoo.com>',
    to: data.email, 
    subject: data.title, 
    html: data.message 
  };

  mail.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      done()
    }
  })
}

module.exports = main