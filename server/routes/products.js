const router = require('express').Router();
const Controller = require('../controllers/productcontroller');
const Authenticate = require('../middleware/authenticate');
const AuthorizeAdmin = require('../middleware/authorize').admin;

const Upload = require('../middleware/upload');
const Multer = require('multer');
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 4000000
  },
});

router.post("/", Authenticate, AuthorizeAdmin, multer.single('file'), Upload, Controller.create)
router.get("/", Authenticate, Controller.findAll)
router.get("/:id", Authenticate, Controller.findOne)
router.delete("/:id", Authenticate, AuthorizeAdmin, Controller.delete)
router.patch("/:id", Authenticate, AuthorizeAdmin, multer.single('file'), Upload, Controller.update)

module.exports = router;

module.exports = router;