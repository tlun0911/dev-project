const express = require('express')
const router = express.Router()
const { getMeals, createMeal, updateMeal, deleteMeal } = require('../controllers/mealController')
const {protect} = require('../middleware/authMiddleware')



router.route('/').get(protect, getMeals).post(protect, createMeal)

router.route('/:id').delete(protect, deleteMeal).put(protect, updateMeal)




module.exports = router