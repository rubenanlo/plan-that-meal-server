const router = require("express").Router();
const mongoose = require("mongoose");

const WeeklyPlan = require("../models/WeeklyPlan.model");
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

//READ list of all weekly plans
router.get("/weeklyplans", isAuthenticated, (req, res, next) => {
  WeeklyPlan.find()
    .populate("weeklyRecipes")
    .then((allWeeklyPlans) => {
      res.json(allWeeklyPlans);
    })
    .catch((err) => res.json(err));
});

//  CREATE a weekly plan without recipes
router.post("/weeklyplans", isAuthenticated, (req, res, next) => {
  const { startDate, mealType } = req.body;

  WeeklyPlan.create({ startDate, mealType, weeklyRecipes: [] })
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
    .populate("weeklyRecipes")
    .then((recipe) => res.json(recipe))
    .catch((error) => res.json(error));
});

// //READ list of recipes for weeklyplanner
// router.get(
//   "/weeklyplan/:weeklyPlanId/recipes",
//   isAuthenticated,
//   (req, res, next) => {
//     Recipe.find()
//       .populate("user")
//       .populate("weeklyPlan")
//       .then((allRecipes) => {
//         res.json(allRecipes);
//       })
//       .catch((err) => res.json(err));
//   }
// );

// //SELECT recipe for weeklyplanner
// router.post(
//   "/weeklyplan/:weeklyPlanId/recipes/:recipeId",
//   isAuthenticated,
//   (req, res, next) => {
//     const { recipeId, weeklyPlanId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(recipeId)) {
//       res.status(400).json({ message: "Specified id is not valid" });
//       return;
//     } else if (!mongoose.Types.ObjectId.isValid(weeklyPlanId)) {
//       res.status(400).json({ message: "Specified id is not valid" });
//       return;
//     }

//     WeeklyPlan.findById(weeklyPlanId).then((weeklyPlan) => {
//       return Recipe.findByIdAndUpdate(recipeId, { weeklyPlan: weeklyPlan._id });
//     });

//     Recipe.findById(recipeId)
//       .then((recipe) => {
//         return WeeklyPlan.findByIdAndUpdate(weeklyPlanId, {
//           weeklyRecipes: recipe._id,
//         });
//       })
//       .then((response) => res.json(response))
//       .catch((err) => res.json(err));
//   }
// );

module.exports = router;
