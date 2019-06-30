const routes = require("express").Router()
const QuestionController = require("../controllers/question.js")
const { Authorization } = require("../middlewares/auth.js")

routes.post("/", QuestionController.create)
routes.get("/", QuestionController.read)
routes.patch("/:questionId", Authorization, QuestionController.update)
routes.delete("/:questionId", Authorization, QuestionController.delete)
routes.patch("/upvote/:questionId", QuestionController.upvote)
routes.patch("/downvote/:questionId", QuestionController.downvote)

module.exports = routes