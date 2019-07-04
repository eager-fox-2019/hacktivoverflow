const routes = require("express").Router()
const questionController = require("../controllers/question.js")

routes.post("/", questionController.create)

module.exports = routes