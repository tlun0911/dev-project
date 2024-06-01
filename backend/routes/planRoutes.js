const express = require("express");
const router = express.Router();
const {
  getPlans,
  createWeeklyMealPlan,
} = require("../controllers/planController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPlans).post(protect, createWeeklyMealPlan);

module.exports = router;
