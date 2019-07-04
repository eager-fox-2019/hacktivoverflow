const User = require('../models/user')
const { sign } = require('../helpers/jwt')
const { decrypt } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const transporter = require('../helpers/nodemailer')
const CronJob = require("cron").CronJob;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class Controller {
    static register(req, res, next) {
        let data = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            watchtags: req.body.tags
        }
        User.create(data).
        then(resp => {
                new CronJob(
                    "0 10 1 * * ",
                    function () {
                        const emailCont = `Hi ${resp.userName}!. This is a friendly reminder to visit our website again!`
                        const mailOptions = {
                            from: '<no-reply-overflow@admin.com>',
                            to: `${resp.email}`,
                            subject: 'Hacktiv Overflow Reminder',
                            html: emailCont
                        }

                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err) {
                                console.log(err, 'error nodemailer');
                            } else {
                                console.log(info, 'success nodemailer');
                            }
                        })
                    },
                    null,
                    true,
                    "America/Los_Angeles"
                )
                res.status(201).json(resp)
            })
            .catch(next)
    }

    static login(req, res, next) {
        User
            .findOne({
                email: req.body.email
            })
            .then(resp => {
                if (resp) {
                    if (decrypt(req.body.password, resp.password)) {
                        let payload = {
                            id: resp._id,
                            userName: resp.userName,
                            email: resp.email,
                            watchtags: resp.watchtags
                        }
                        let token = sign(payload)
                        res.status(200).json({
                            token,
                            userName: resp.userName,
                            email: resp.email,
                        })
                    } else {
                        throw ({
                            status: 400,
                            message: "Email/Password wrong"
                        })
                    }
                } else {
                    throw ({
                        status: 404,
                        message: "Email/Password wrong"
                    })
                }
            })
            .catch(next)
    }

    static googlesignin(req, res, next) {
        client
            .verifyIdToken({
                idToken: req.body.idToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            })
            .then(function (ticket) {
                const ticketpayload = ticket.getPayload()
                let data = {
                    userName: ticketpayload.name,
                    email: ticketpayload.email,
                    password: "hehe"
                }

                return User
                    .findOne({
                        email: ticketpayload.email
                    })
            })
            .then(resp => {
                if (resp) {
                    if (decrypt(data.password, resp.password)) {
                        let payload = {
                            id: resp._id,
                            userName: resp.userName,
                            email: resp.email
                        }
                        let token = sign(payload)
                        res.status(200).json({
                            token,
                            userName: resp.userName
                        })
                    } else {
                        throw ({
                            status: 400,
                            message: "Email/Password wrong"
                        })
                    }
                } else {
                    return User
                        .create(data)
                }
            })
            .then(resp => {
                let payload = {
                    id: resp._id,
                    userName: resp.userName,
                    email: resp.email
                }
                let token = sign(payload)
                res.status(200).json({
                    token
                })
            })
            .catch(next)
    }
}

module.exports = Controller