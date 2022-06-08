const router = require("express").Router();

const { createPost } = require("../controllers/post");
const { updatePost } = require("../controllers/post");
const { deletePost } = require("../controllers/post");
const multer = require("../middlewares/multer");
const { postValidator, validate } = require("../middlewares/postValidator");
const { parseData } = require("../middlewares/index");

router.post(
  "/create",
  multer.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  createPost
);

router.put(
  "/:postId",
  multer.single("thumbnail"),
  parseData,
  postValidator,
  validate,
  updatePost
);
router.delete("/:postId", deletePost);

module.exports = router;
