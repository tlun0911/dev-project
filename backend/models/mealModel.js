const { timeStamp } = require('console')
const mongoose = require('mongoose')

const mealSchema = mongoose.Schema(
    {
        type: {
            type: String
        },
        meal_name: String,
        ingredients: [String],
        recipe: String,


    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Meal', mealSchema)