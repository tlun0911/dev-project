const express = require("express");
const router = express.Router();
const {
  getPlans,
  createWeeklyMealPlan,
  deletePlan,
} = require("../controllers/planController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPlans).post(protect, createWeeklyMealPlan);
router.route("/:id").delete(protect, deletePlan);

module.exports = router;
