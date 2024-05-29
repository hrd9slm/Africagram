const express = require("express");
const likesRouter = express.Router();
const likesControler = require("../controllers/LikesController");

// Create a POST request endpoint, like /posts
likesRouter.post("/posts/:id/like", likesControler.addNewLike);

module.exports = likesRouter;
