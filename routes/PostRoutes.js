const express = require("express");
const postRouter = express.Router();
const postControler = require("../controllers/PostController");

// Create a POST request endpoint, like /posts
postRouter.post("/post/add", postControler.addNewPost);

module.exports = postRouter;
