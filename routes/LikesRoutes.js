const express = require("express");
const likesRouter = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const { addNewLike } = require("../controllers/LikesController");
// Create a POST request endpoint, like /posts
likesRouter.post("/:id", authMiddleware, addNewLike);

module.exports = likesRouter;
