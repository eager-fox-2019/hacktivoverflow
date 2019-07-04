const User = require("../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class userController {

    static signin(req, res, next) {
        console.log(req.body);
        User.findOne({
            email: req.body.email
        }).then(found => {
            console.log(found);
            if (found) {
                let isPasswordValid = bcrypt.compareSync(req.body.password, found.password)
                console.log(isPasswordValid);
                if (isPasswordValid) {
                    let token = jwt.sign({
                        username: found.name,
                        id: found.id
                    }, process.env.JWT_SECRET)
                    res.json({
                        msg: "logged in",
                        token,
                        name: found.name,
                        id: found.id,
                    })
                } else {
                    res.status(404).json({
                        msg: "wrong password/username"
                    })
                }
            } else {
                res.status(404).json({
                    msg: "wrong password/username"
                })
            }
        }).catch(next)
    }

    static async register(req, res, next) {
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: req.body.image,
            interest: req.body.tags
        })
        try {
            let save = await user.save()
            res.json(save)
        } catch (error) {
            next(error)
        }
    }

    static async getUser(req, res, next) {
        res.json(req.loggedUser)
    }

    static async getUserQuestions(req, res, next) {
        try {
            // console.log(req.loggedUser);
            let user = await User.findById(req.loggedUser._id)
                .populate({
                    path: "questions",
                    populate: {
                        path: "author"
                    }
                })
            console.log((user.questions, '/////////////////////'));
            res.json(user.questions)
        } catch (error) {
            next(error)
        }
    }

    static async updateInterest(req, res, next) {
        req.loggedUser.interest = req.body.tags
        try {
            res.json(await req.loggedUser.save())
        } catch (error) {
            next(error)
        }
    }

}

module.exports = userController