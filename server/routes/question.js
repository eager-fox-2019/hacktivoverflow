const routes = require("express").Router()
const QuestionController = require("../controllers/question.js")
const { Authorization } = require("../middlewares/auth.js")

routes.post("/", QuestionController.create)
routes.get("/", QuestionController.read)
routes.patch("/:questionId", Authorization, QuestionController.update)
routes.delete("/:questionId", Authorization, QuestionController.delete)

// add upvotes and downvotes
//remove upvotes and downvotes

module.exports = routes