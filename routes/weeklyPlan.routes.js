const router = require("express").Router();
// const mongoose = require('mongoose');

const WeeklyPlan = require("../models/WeeklyPlan.model");
const Recipe = require("../models/Recipe.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

//READ list of all weeklyplanners
router.get("/weeklyplan", isAuthenticated, (req, res, next) => {
  WeeklyPlan.find()
    .populate("weeklyRecipes")
    .then((allWeeklyPlans) => {
      res.json(allWeeklyPlans);
    })
    .catch((err) => res.json(err));
});

//  CREATE a weekly plan without recipes
router.post("/weeklyplan", (req, res, next) => {
  const { date, protein } = req.body;

  WeeklyPlan.create({ date, protein, weeklyRecipes: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//READ weekly plan details
router.get("/weeklyplan/:weeklyplanId", (req, res, next) => {
  const { weeklyPlanId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(weeklyPlanId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  WeeklyPlan.findById(weeklyPlanId)
    // .populate("weeklyRecipes")
    .then((project) => res.json(project))
    .catch((error) => res.json(error));
});

//READ list of recipes for weeklyplanner
router.get(
  "/weeklyplan/:weeklyplanId/select",
  isAuthenticated,
  (req, res, next) => {
    Recipe.find()
      .populate("users")
      .then((allRecipes) => {
        res.json(allRecipes);
      })
      .catch((err) => res.json(err));
  }
);

//SELECT recipe for weeklyplanner
router.post("/select/:recipeId", isAuthenticated, (req, res, next) => {
  const { recipeId } = req.params;
  const { weeklyPlan: weeklyPlanId } = req.body; //how am i getting this weeklyPlanId?
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Recipe.findByIdAndUpdate(recipeId)
    .then((recipe) => {
      return WeeklyPlan.findByIdAndUpdate(weeklyPlanId, {
        $push: { weeklyPlan: recipe._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
