//import nessery pacatges
const express = require("express");
const commentsRouter = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const { addNewComment } = require("../controllers/CommentController")

// Commenting on a post
commentsRouter.post("/:id", authMiddleware, addNewComment);

//export the router
module.exports = commentsRouter;
