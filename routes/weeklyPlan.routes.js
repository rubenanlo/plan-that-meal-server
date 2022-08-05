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
    .populate("weeklyRecipes")
    .then((allWeeklyPlans) => {
      const userWeeklyPlan = allWeeklyPlans.filter(
        (weeklyPlan) => weeklyPlan.user._id == req.payload._id
      );
      res.json(userWeeklyPlan);
    })
    .catch((err) => res.json(err));
});

//  CREATE a weekly plan without recipes
router.post("/weeklyplans", isAuthenticated, (req, res, next) => {
  WeeklyPlan.create({
    startDate: req.body.startDate,
    mealType: req.body.mealType,
    weeklyRecipes: [],
    user: req.payload._id,
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
    .populate("weeklyRecipes")
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
