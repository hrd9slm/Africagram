const express = require("express");
const userController = require("../controllers/UserController");
const router = express.Router();

router
  .route("/users")
  .get(userController.getAllUsers)
  .post(userController.registerUser);

router
  .route("/users/:id")
  .put(userController.updateUser)
  .delete(userController.deleteUser);
router.route("/users/login").post(userController.loginUser);

module.exports = router;
