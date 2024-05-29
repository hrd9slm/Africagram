const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.route("/auth/login").post(AuthController.loginUser);
router.route("/auth/register").post(AuthController.registerUser);
router.route("/auth/check").post(AuthController.authenticateUser);

module.exports = router;
