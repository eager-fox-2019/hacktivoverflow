const kue = require('kue')
const CronJob = require('cron').CronJob;

let transporter = require('../helpers/mail-helper')

const queue = kue.createQueue()


queue.create('email-ceo', {
  from:"dev.robbycaesar@gmail.com",
  subject: "Letter from CEO - Takon",
  html:`
  <h1>Welcome To Takon</h1>
  <p>I see that yesterday you join our community in Takon. I hope that you're having a good time using 
  Takon. Takon is platform where an expert meets the one that needs answers. 
  Takon is a javanese word which means "asking". So don't hestitate to ask something here.
  </p>
  <h3>Happy learning!</h3>
  `
}).save()

function processEmail(user) {
  return queue.process('email-ceo', (job, done) => {
    // console.log('masuk ke queue job', job)
    let sendEmail = {
      from: job.data.from,
      subject: job.data.subject,
      html: job.data.html,
      to: user.email
    }
    console.log('sendEmail di helper process Email', sendEmail)
    // send after time
    console.log('Before job instantiation');
    let date = new Date();
    date.setSeconds(date.getSeconds()+300);
    const sendTommorow = new CronJob(date, function() {
      const d = new Date();
      console.log('Send Email : Specific date:', date, ', onTick at:', d);
      transporter.sendMail(sendEmail)
    });
    console.log('After job instantiation');
    sendTommorow.start()
    done()
  })
}

module.exports = {
  queue,
  processEmail
}