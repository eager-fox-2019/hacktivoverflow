const express = require("express")
const router = express.Router()
const postRouter = require("./post-router")
const commentRouter = require("./comment-router")
const userRouter = require("./user-router")

router.use("/users", userRouter)
router.use("/posts", postRouter)
router.use("/comments", commentRouter)

module.exports = router