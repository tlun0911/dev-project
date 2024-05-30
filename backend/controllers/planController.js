const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')

const Plan = require('../models/weeklyPlanModel')
const User = require('../models/userModel')

// @desc   Get all user plans
// @route  GET /api/plans
// @access  Private
const getPlans = asyncHandler(async (req, res) => {
    const plans = await Plan.find({ user: req.user.id })

    res.status(200).json(plans)
})

// @desc     Create new plan
// @route    POST /api/plans
// @access   Private
const createWeeklyMealPlan = async (req, res) => {

    try {
        const { weekStartDate, days } = req.body; // Destructure required fields from the request body


        // Create a new WeeklyMealPlan instance
        const newWeeklyMealPlan = new Plan({
            user: req.user.id, // Ensure the user ID is a valid ObjectId
            weekStartDate: new Date(weekStartDate), // Ensure the date is properly formatted
            days: {
                monday: { meal: days.monday },
                tuesday: { meal: days.tuesday },
                wednesday: { meal: days.wednesday },
                thursday: { meal: days.thursday },
                friday: { meal: days.friday },
                saturday: { meal: days.saturday },
                sunday: { meal: days.sunday },
            }
        });

        // Save the new WeeklyMealPlan to the database
        const savedWeeklyMealPlan = await newWeeklyMealPlan.save();

        // Send a response with the saved weekly meal plan
        res.status(201).json(savedWeeklyMealPlan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Could not create weekly meal plan.' });
    }
};

module.exports = {
    createWeeklyMealPlan,
    getPlans,
};