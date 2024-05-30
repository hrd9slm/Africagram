const express = require("express");
const userController = require("../controllers/UserController");
const authmiddelware = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.route("/users").get(userController.getAllUsers);

router
  .route("/users/:id")
  .put(authmiddelware, userController.updateUser)
  .delete(authmiddelware, userController.deleteUser);

module.exports = router;
