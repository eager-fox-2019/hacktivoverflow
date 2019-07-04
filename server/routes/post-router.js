const express = require("express")
const router = express.Router()
const postController = require("../controllers/post-controller")
const authenticate = require("../middlewares/authenticate")

router.post("/add", authenticate, postController.create)
router.get("/all", postController.findAll)
router.get("/myposts", authenticate, postController.findMyPosts)
router.put("/upvote", authenticate, postController.upvote)
router.put("/downvote", authenticate, postController.downvote)
router.put("/unvote", authenticate, postController.unvote)
router.delete("/delete", authenticate, postController.delete)

module.exports = router