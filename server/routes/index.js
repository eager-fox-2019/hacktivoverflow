const routes = require("express").Router()
const { Authentication } = require("../middlewares/auth.js")
const User = require("./user.js")
const Question = require("./question.js")
const Answer = require("./answer.js")

routes.use("/", User)
routes.use(Authentication)
routes.use("/question", Question)
routes.use("/answer", Answer)

module.exports = routes