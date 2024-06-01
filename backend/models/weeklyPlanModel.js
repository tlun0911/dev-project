const mongoose = require("mongoose");

// Define the day schema
const daySchema = mongoose.Schema(
  {
    meal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
  },
  {
    _id: false, // Prevent creating _id for each day subdocument
  }
);

// Define the weekly meal plan schema
const weeklyMealPlanSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    days: {
      monday: daySchema,
      tuesday: daySchema,
      wednesday: daySchema,
      thursday: daySchema,
      friday: daySchema,
      saturday: daySchema,
      sunday: daySchema,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", weeklyMealPlanSchema);
