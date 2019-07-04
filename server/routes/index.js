const routes = require("express").Router()
const { Authentication } = require("../middlewares/authentication.js")
const User = require("./userRoutes.js")
const Question = require("./questionRoutes")

routes.use("/", User)
routes.use(Authentication)
routes.use("/", Question)

module.exports = routes