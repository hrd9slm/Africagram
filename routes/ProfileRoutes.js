const express = require("express");
const ProfileRouter = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const { createNewProfile, editProfile } = require("../controllers/ProfileController");

// Create a New Profile Endpoint: This endpoint will handle the creation of a new user profile. It should accept user details such as name, email, password, etc., and create a new profile in the database.
ProfileRouter.post("/creat", authMiddleware, createNewProfile);
ProfileRouter.patch("/edit", authMiddleware, editProfile);

module.exports = ProfileRouter;
