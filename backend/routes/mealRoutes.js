const express = require('express')
const router = express.Router()
const { getMeals, createMeal, updateMeal, deleteMeal, getMeal } = require('../controllers/mealController')
const {protect} = require('../middleware/authMiddleware')



router.route('/').get(protect, getMeals).post(protect, createMeal)

router.route('/:id').delete(protect, deleteMeal).put(protect, updateMeal).get(protect, getMeal)




module.exports = router