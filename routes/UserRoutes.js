const express = require("express");
const userController = require("../controllers/UserController");
const authmiddelware = require("../middlewares/AuthMiddleware");
const router = express.Router();

router
  .route("/users")
  .get(userController.getAllUsers)
  .put(authmiddelware, userController.updateUser);


module.exports = router;
