const router = require("express").Router();
// const mongoose = require('mongoose');

const WeeklyPlan = require("../models/WeeklyPlan.model");
const Recipe = require("../models/Recipe.model");

//  POST /api/WeeklyPlans  -  Creates a new WeeklyPlan
router.post("/weeklyplan", (req, res, next) => {
  const { date, protein, recipeId } = req.body;

  WeeklyPlan.create({ date, protein, weeklyRecipes: recipeId })
    .populate("Recipe")
    .then((newWeeklyPlan) => {
      return Recipe.findByIdAndUpdate(recipeId, {
        $push: { weeklyRecipes: recipe._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
