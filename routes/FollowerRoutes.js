const express = require("express");
const router = express.Router();
const followersController = require("../controllers/FollowerController");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post("/follow/:id", authMiddleware, followersController.followUser);
router.get("/followers", authMiddleware, followersController.getFollowers);
module.exports = router;
