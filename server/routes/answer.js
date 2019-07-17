const routes = require("express").Router()
const AnswerController = require("../controllers/answer.js")
const { Authorization2 } = require("../middlewares/auth.js")

routes.post("/:questionId", AnswerController.create)
routes.get("/:questionId", AnswerController.read)
routes.patch("/:id", Authorization2, AnswerController.update)
routes.delete("/:id", Authorization2, AnswerController.delete)
routes.patch("/upvote/:id", AnswerController.upvote)
routes.patch("/downvote/:id", AnswerController.downvote)

module.exports = routes