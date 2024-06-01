const express = require("express");
const router = express.Router();
const {
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal,
  browseMeals,
} = require("../controllers/mealController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getMeals).post(protect, createMeal);

router.route("/:id").delete(protect, deleteMeal).put(protect, updateMeal);

router.route("/browse").get(protect, browseMeals);

module.exports = router;
