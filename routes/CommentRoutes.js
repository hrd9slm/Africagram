//import nessery pacatges
const express = require("express");
const commentsRouter = express.Router();
const { addNewComment } = require("../controllers/CommentController")

// Commenting on a post
commentsRouter.post("/:id", addNewComment);

//export the router
module.exports = commentsRouter;
