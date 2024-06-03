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

router.route("/:userid").get(protect, getMeals).post(protect, createMeal);

router
  .route("/:userid/:id")
  .delete(protect, deleteMeal)
  .put(protect, updateMeal)
  .post(protect, addMealToUserCollection);

router.route("/:userid/browse").get(protect, browseMeals);

module.exports = router;
