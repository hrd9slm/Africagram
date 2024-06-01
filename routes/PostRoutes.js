const express = require("express");
const postRouter = express.Router();
const postControler = require("../controllers/PostController");

// Create a POST request endpoint, like /posts
postRouter.post("/post/add", postControler.addNewPost);

// Create a Get request endpoint, to show the lastes posts was created
postRouter.get("/posts/latest", (req, res) => {
    res.redirect("/posts/latest/1");
});
postRouter.get("/posts/latest/:pageNum", postControler.getTheletestPostes);


module.exports = postRouter;
