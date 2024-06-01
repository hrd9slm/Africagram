const express = require("express");
const uplodeImageRouter = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const upload = require("../middlewares/uplode-images");
const { updatePostImageUrl } = require("../controllers/PostController")

// Route for uploding image
uplodeImageRouter.post(
  "/:postId",
  authMiddleware,
  upload.single("Image"),
  updatePostImageUrl
);

module.exports = uplodeImageRouter;
