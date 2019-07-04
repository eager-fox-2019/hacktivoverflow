const router = require("express").Router()
const question = require('./question')
const user = require("./user")
const answer = require("./answer")

router.get("/", (req, res) => {
  res.json({ message: 'API connected' })
})

router.use("/questions", question)
router.use("/users", user)
router.use("/answers",answer)
module.exports = router