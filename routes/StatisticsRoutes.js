const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/AuthMiddleware");
const isAdminMiddleware = require("../middlewares/IsadminMiddleware");
const StatisticsController = require("../controllers/StatisticsController");

router.get(
  "/admin",
  authMiddleware,
  isAdminMiddleware,
  StatisticsController.check
);
router.get(
  "/total-users",
  authMiddleware,
  isAdminMiddleware,
  StatisticsController.getTotalUsers
);
router.get(
  "/users-by-country",
  authMiddleware,
  isAdminMiddleware,
  StatisticsController.getUsersByCountry
);
router.get(
  "/average-posts-per-user",
  authMiddleware,
  isAdminMiddleware,
  StatisticsController.getAveragePostsPerUser
);
router.get(
  "/gender",
  authMiddleware,
  isAdminMiddleware,
  StatisticsController.getGender
);
module.exports = router;
