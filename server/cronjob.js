let pEnv = process.env.NODE_ENV;
if(pEnv === "test" || 
	pEnv === "development"){
	require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();

var cors = require('cors')
app.use(cors())

let dbName = process.env.dbName + '-' + process.env.NODE_ENV
console.log(dbName)
mongoose.connect(dbName,  
	{useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Models = require('./models')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const kue = require('kue');
const queue = kue.createQueue();

const moment = require('moment');
const cron = require('cron');
const CronJob = cron.CronJob;
//scheduler for the queue

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	 	service: 'gmail',
	    auth: {
	      user: process.env.adminEmail,
	      pass: process.env.adminEmailPassword
	    }
  	});

//helper function to get top questions
function compare(a, b){
  let score_a = a.upvotes.length - a.downvotes.length
  let score_b = b.upvotes.length - b.downvotes.length
  if (score_a > score_b) return -1;
  if (score_b > score_a) return 1;

  return 0;
}

//0 8 * * 7 for weekly every sunday 8am
const job = new CronJob( '0 8 * * 7', async () => {

	const date = moment(new Date()).tz('Asia/Jakarta').format()
	// console.log(date)

	//get email
	let userEmailArray = []
	await Models.User.find()
	.then(result => {
		result.forEach(user => {
			userEmailArray.push( user.email )
		})
	})

	let content = '<p>no questions yet :)</p>'
	await Models.Question.find()
	.then(result => {
		if (result){
			//get total votes for all questions and corresponding title + description
			//then save the top 5
			result.sort(compare).slice(0,5)

			result.forEach((question, i) => {
				content = `<h3>Question ${i}: ${question.title}</h3>
				<p>${question.description}</p>`
			})
		}
	})
	.catch(error => {
		console.log({error})
	})
	
	userEmailArray.forEach(email => {
	  	let mailOptions = {
		  from: 'minioverflow@gmail.com',
		  to: email,
		  subject: 'Your Weekly Subscription to Mini-Overflow',
		  html: content
		};

		let mailQueue = queue.create('weeklyMailer', mailOptions)
		.save(err => {
			if(err) console.log(err)
		})	
	})
})

job.start()

queue.process('weeklyMailer', 5, (job, done) => {
	// mailOptions yang tadi di queue ada di job.data
	let sendAMail = transporter.sendMail(job.data, function (err, info) {
	   if(err)
	     console.log(err)
	   else
	     console.log(info);
	});

	console.log(job.data.to)
	done()
})