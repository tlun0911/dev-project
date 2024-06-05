const express = require("express");
const router = express.Router();
const {
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal,
  browseMeals,
  addMealToUserCollection,
} = require("../controllers/mealController");
const { protect } = require("../middleware/authMiddleware");




router.route("/:userid/browse").get(protect, browseMeals);

router.route("/:userid").get(protect, getMeals).post(protect, createMeal);

router
.route("/:userid/:id").delete(protect, deleteMeal).put(protect, updateMeal).post(addMealToUserCollection);

module.exports = router;
