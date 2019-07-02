const kue = require('kue')
  , queue = kue.createQueue()
  , CronJob = require('cron').CronJob
  , Question = require('../models/question')
  , User = require('../models/user')
  , express =require('express')
  , app = express()
  , nodemailer = require("nodemailer");

module.exports = () => {
  let fiveRecentQuestion = []
  let userEmail = []
  Question.find({}).sort({'created_at' : -1}).limit(5).exec(function (err, questions) {
    if (err) {
      console.log({code: 500, message: err.message})
    } else {
      for (let i = 0; i < questions.length; i++) {
        fiveRecentQuestion.push(questions[i].title)
      }
      User.find({}).exec(function (err, users) {
        if (err) {
          console.log({code: 500, message: err.message})
        } else {
          for (let i = 0; i < users.length; i++) {
            userEmail.push(users[i].email)
          }
          var job = queue.create('email', {
            title: '5 Latest Question Asked',
            to: userEmail.join(', '),
            template: `
Hi these are 5 latest question asked! If you know the answer please submit to help other at hacktiv-overflow.lyxcious.xyz
Question :
1. ${fiveRecentQuestion[0]}
2. ${fiveRecentQuestion[1]}
3. ${fiveRecentQuestion[2]}
4. ${fiveRecentQuestion[3]}
5. ${fiveRecentQuestion[4]}            
`
          }).save( function(err){
            if( !err ) console.log( job.id );
          });

          queue.process('email', function (job, done) {
            main(job.data).catch(console.error);
          })
          
          async function main(data){
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.EMAIL_PASS // generated ethereal password
              }
            });
          
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: process.env.EMAIL, // sender address
              to: data.to, // list of receivers
              subject: data.title, // Subject line
              text: data.template, // plain text body
            });
          
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          
            // Preview only available when sending through an Ethereal account
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }
        }
      })
    }
  })
}