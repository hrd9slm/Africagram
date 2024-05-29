const express = require("express");
const postRouter = express.Router();
const postControler = require("../controllers/PostController");

// Create a POST request endpoint, add new posts
postRouter.post("/post/add", postControler.addNewPost);

// Create a Get request endpoint, to show the lastes posts was created
postRouter.get("/posts/latest", postControler.getTheletestPostes);

module.exports = postRouter;
