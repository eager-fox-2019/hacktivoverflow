const User = require('../models/User')
const jwt = require('../helpers/jwt.js')
const bcrypt = require('bcryptjs')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(`${process.env.GOOGLESIGNINID}`)

class UserController {
    static register(req, res, next) {
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }
        User.create(newUser)
            .then((gotData) => {
                let userData = {
                    id: gotData.id,
                    username: gotData.username
                }
                let userToken = jwt.sign(userData)
                res.status(200).json({
                    token : userToken,
                    id : gotData.id,
                    username : gotData.username,
                })

            })
            .catch(next)

    }

    static login(req, res, next) {
        // console.log("masuk login");
        
        User.findOne({
                username: req.body.username
            })
            .then((gotData) => {
                if (!gotData) {
                    throw ({
                        code: 404,
                        message: " Email Not Found"
                    })
                } else {
                    if (bcrypt.compareSync(req.body.password, gotData.password)) {
                        let userData = {
                            id: gotData.id,
                            username: gotData.username
                        }
                        let userToken = jwt.sign(userData)
                        res.status(200).json({
                            token : userToken,
                            id : gotData.id,
                            username : gotData.username,
                        })

                    } else {
                        res.status(400).json({
                            message: "Email / Password Not Match"
                        })
                    }
                }
            })
            .catch(next)
    }

    static googlelogin(req,res,next){
        let userEmail = ""
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLESIGNINID
        })
        .then((gotData)=>{
            const { email, name, picture } = gotData.getPayload();
            let fullName = name.split(" ")
            let firstName = fullName[0]
            let lastName = fullName[1]
            User.findOne({email: email})
            .then((gotData)=>{
                if(gotData){
                    let userData = {
                        id : gotData.id,
                        email : gotData.email
                    }
                    let userToken = jwt.sign(userData)
                    res.status(200).json({
                        token : userToken,
                        email : gotData.email,
                        id : gotData.id
                    })
                } else {
                    let newUser = {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password: "defaultPassword",
                        avatar : picture
                    }
                    User.create(newUser)
                    .then((gotData)=>{
                        let userData = {
                            id: gotData.id,
                            email: gotData.email
                        }
                        let userToken = jwt.sign(userData)
                        res.status(200).json({
                            token : userToken,
                            userProfile : gotData
                        })
                    })
                    .catch(next)
                }
            })
            .catch(next)
        })
    }

    static edit(req,res,next){
        User.findOne({_id:req.params.id})
        .then((gotData)=>{
            gotData.first_name = req.body.first_name,
            gotData.last_name = req.body.last_name,
            gotData.email = req.body.email,
            gotData.username = req.body.username,
            gotData.password = req.body.password
            return gotData.save()
        })
        .then((sucsess)=>{
            if(sucsess){
                res.json(sucsess)
            } else {
                throw {code : 500, message : "internal server error"}
            }
        })
        .catch(next)
    }

}

module.exports = UserController
