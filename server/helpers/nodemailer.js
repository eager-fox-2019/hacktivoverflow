const kue = require("kue"),
  cron = require("node-cron"),
  queue = kue.createQueue(),
  User = require("../models/user"),
  Question = require("../models/question"),
  nodemailer = require("nodemailer"),
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.GOOGLE_EMAIL}`,
      pass: `${process.env.GOOGLE_PASS}`
    }
  });

var task = cron.schedule(
  // "*/1 * * * *", //buat test tiap semenit
  "0 8 * * 1", //tiap senin jam 8 pagi kirimin question of the week, yaitu question yang paling dapat banyak like di semua periode
  () => {
    Question.find({})
      .populate("userId")
      .then(questions => {
        let result = questions.sort(function(a, b) {
          return b.upvotes.length - a.upvotes.length;
        });
        let q_otw = result[0];
        let emailCont = `
        this is the question of the week : <br>
        <hr>
        <h1>${q_otw.title}</h1><br>
        <small> by : ${q_otw.userId.username}</small>
        <p>${q_otw.description}</p>
        <p>${q_otw.upvotes.length} people upvoted this</p>
        <p>created at: ${new Date(q_otw.createdAt)}</p>
        <a href="http://noviirna-overflow.com/question/${
          q_otw._id
        }">Checkout this question at our site!</a>
      `;
        User.find({})
          .then(founds => {
            founds.forEach(user => {
              const mailOptions = {
                from: "info@noviirna-overflow.site", // sender address
                to: `${user.email}`, // list of receivers
                subject: `Question Of The Week - ${new Date().toDateString()}`, // Subject line
                html: emailCont
              };
              async function sentmail() {
                await transporter
                  .sendMail(mailOptions)
                  .then(sent => {
                    console.log("email sent to", user.email);
                    var qotw_job = queue
                      .create("qotw", {
                        title: `QOTW email on monday at 8.00 am sent to ${
                          user.email
                        }"`
                      })
                      .save(err => {
                        if (err) {
                          console.log(err);
                        }
                      });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }
              sentmail();
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
    console.log("EMAIL SENT TO ALL USER");
  },
  { timezone: "Asia/Jakarta" }
);

module.exports = {
  task: task,
  queue: queue
};
