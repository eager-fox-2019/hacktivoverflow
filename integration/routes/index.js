const express = require("express")
const router = express.Router()
const questionRouter = require("./question-router")


router.use("/questions", questionRouter)

module.exports = router