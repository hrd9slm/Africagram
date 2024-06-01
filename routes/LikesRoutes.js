const express = require("express");
const likesRouter = express.Router();
const { addNewLike } = require("../controllers/LikesController");

// Create a POST request endpoint, like /posts
likesRouter.post("/:id", addNewLike);

module.exports = likesRouter;
