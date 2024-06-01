const express = require("express");
const postRouter = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const { addNewPost, getTheletestPostes } = require("../controllers/PostController");

// Create a POST request endpoint, like /posts
postRouter.post("/add", authMiddleware, addNewPost);

// Create a Get request endpoint, to redirect the user to the write url
postRouter.get("/latest", authMiddleware, (req, res) => {
    res.redirect("/latest/1");
});
// Create a Get request endpoint, to show the lastes posts was created
postRouter.get("/latest/:pageNum", authMiddleware, getTheletestPostes);


module.exports = postRouter;
