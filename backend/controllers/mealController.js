const asyncHandler = require("express-async-handler");

const Meal = require("../models/mealModel");
const User = require("../models/userModel");

// @desc   Get all meals
// @route  GET /api/meals/:userid
// @access  Private
const getMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find({ user: req.user.id });

  res.status(200).json(meals);
});

//@desc    Get all non-user meals to browse
//@route   GET /api/meals/:userid/browse
//@access  Private
const browseMeals = asyncHandler(async (req, res) => {
  const meals = await Meal.find({ user: { $ne: req.user.id } });

  res.status(200).json(meals);
});

// @desc   Set meal
// @route  POST /api/meals/:userid
// @access  Private
const createMeal = asyncHandler(async (req, res) => {
  if (!req.body.meal_name) {
    res.status(400);
    throw new Error("Please add required information");
  }

  const meal = await Meal.create({
    user: req.user.id,
    type: req.body.type,
    meal_name: req.body.meal_name,
    ingredients: req.body.ingredients,
    recipe: req.body.recipe,
    user_email: req.body.user_email,
  });
  res.status(200).json(meal);
});

// @desc   Update meal
// @route  POST /api/meals/:userid/:id
// @access  Private
const updateMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);

  if (!meal) {
    res.status(400);
    throw new Error("Meal Not Found");
  }

  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the meal user

  const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedMeal);
});

// @desc   Delete meal
// @route  DELETE /api/meals/:userid/:id
// @access  Private
const deleteMeal = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);

  if (!meal) {
    res.status(400);
    throw new Error("Meal Not Found");
  }

  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the meal user

  await meal.deleteOne();
  res.status(200).json({ id: req.params.id });
});

//@desc    Add meal to user collection
//@route   POST /api/meals/:userid/:id
//@access  Private
const addMealToUserCollection = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.mealId);
  const newMeal = await Meal.create({
    meal_name: meal.meal_name,
    type: meal.type,
    ingredients: meal.ingredients,
    recipe: meal.recipe,
    user_email: meal.user_email,
    user: req.user.id,
  });
  res.status(200).json(newMeal);
});

module.exports = {
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal,
  browseMeals,
  addMealToUserCollection,
};
