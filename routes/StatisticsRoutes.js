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
module.exports = router;
