const { timeStamp } = require("console");
const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    user_email: String,
    type: {
      type: String,
    },
    meal_name: String,
    ingredients: [String],
    recipe: String,
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meal", mealSchema);
