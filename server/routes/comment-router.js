const express = require("express")
const router = express.Router()
const authenticate = require("../middlewares/authenticate")
const commentController = require("../controllers/comment-controller")

router.post("/add", authenticate, commentController.create)
router.get("/all", commentController.findAll)
router.put("/upvote", authenticate, commentController.upvote)
router.put("/downvote", authenticate, commentController.downvote)
router.put("/unvote", authenticate, commentController.unvote)
router.delete("/delete", authenticate, commentController.del)
router.put("/edit", authenticate, commentController.update)

module.exports = router