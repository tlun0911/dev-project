const express = require('express')
const router = express.Router()
const { getMeals, createMeal, updateMeal, deleteMeal } = require('../controllers/mealController')


router.route('/').get(getMeals).post(createMeal)

router.route('/:id').delete(deleteMeal).put(updateMeal)




module.exports = router