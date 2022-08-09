const router = require("express").Router();
const mongoose = require("mongoose");

const WeeklyPlan = require("../models/WeeklyPlan.model");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

//READ list of all weekly plans
router.get("/weeklyplans", isAuthenticated, (req, res, next) => {
  WeeklyPlan.find()
    .populate("user")
    .populate("mealRecipes")
    .then((allWeeklyPlans) => {
      const userWeeklyPlan = allWeeklyPlans.filter(
        (weeklyPlan) => weeklyPlan.user._id == req.payload._id
      );
      res.json(userWeeklyPlan);
    })
    .catch((err) => res.json(err));
});

//  CREATE a weekly plan of recipes
router.post("/weeklyplans", isAuthenticated, (req, res, next) => {
  console.log(req.body);
  WeeklyPlan.create({
    startDate: req.body.startDate,
    mealRecipes: req.body.mealRecipes,
    user: req.payload._id,
  })

    .then((newMealPlan) => {
      newMealPlan.mealRecipes.forEach((mealRecipe) => {
        Recipe.findByIdAndUpdate(mealRecipe, {
          $push: { weeklyPlan: newMealPlan._id },
        });
      });
    })
    .then((response) => res.json(response))

    .catch((err) => res.json(err));
});

//READ weekly plan details
router.get("/weeklyplans/:weeklyPlanId", isAuthenticated, (req, res, next) => {
  const { weeklyPlanId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(weeklyPlanId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  WeeklyPlan.findById(weeklyPlanId)
    .populate("mealRecipes")
    .then((recipe) => res.json(recipe))
    .catch((error) => res.json(error));
});

//DELETE weekly plan details
router.delete(
  "/weeklyplans/:weeklyPlanId",
  isAuthenticated,
  (req, res, next) => {
    const { weeklyPlanId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(weeklyPlanId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    WeeklyPlan.findByIdAndRemove(weeklyPlanId)
      .then(() =>
        res.json({
          message: `Weekly Plan with id ${weeklyPlanId} was removed successfully.`,
        })
      )
      .catch((error) => res.status(500).json(error));
  }
);

module.exports = router;
