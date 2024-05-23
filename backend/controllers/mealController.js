const asyncHandler = require('express-async-handler')

// @desc   Get all meals
// @route  GET /api/meals
// @access  Private
const getMeals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get meal'})
})

// @desc   Set meal
// @route  POST /api/meals
// @access  Private
const createMeal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add required information')
    }
    res.status(200).json({message: 'Create meal'})
})

// @desc   Update meal
// @route  POST /api/meals/:id
// @access  Private
const updateMeal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Update meal ${req.params.id}`})
})

// @desc   Delete meal
// @route  DELETE /api/meals/:id
// @access  Private
const deleteMeal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete meal ${req.params.id}`})
})


module.exports = {
    getMeals,
    createMeal,
    updateMeal,
    deleteMeal,
}