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
    .populate("mealRecipe11")
    .populate("mealRecipe12")
    .populate("mealRecipe21")
    .populate("mealRecipe22")
    .populate("mealRecipe31")
    .populate("mealRecipe32")
    .populate("mealRecipe41")
    .populate("mealRecipe42")
    .populate("mealRecipe51")
    .populate("mealRecipe52")
    .populate("mealRecipe61")
    .populate("mealRecipe62")
    .populate("mealRecipe71")
    .populate("mealRecipe72")
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
    mealRecipe11: req.body.mealRecipe11,
    mealRecipe12: req.body.mealRecipe12,
    mealRecipe21: req.body.mealRecipe21,
    mealRecipe22: req.body.mealRecipe22,
    mealRecipe31: req.body.mealRecipe31,
    mealRecipe32: req.body.mealRecipe32,
    mealRecipe41: req.body.mealRecipe41,
    mealRecipe42: req.body.mealRecipe42,
    mealRecipe51: req.body.mealRecipe51,
    mealRecipe52: req.body.mealRecipe52,
    mealRecipe61: req.body.mealRecipe61,
    mealRecipe62: req.body.mealRecipe62,
    mealRecipe71: req.body.mealRecipe71,
    mealRecipe72: req.body.mealRecipe72,
    user: req.payload._id,
  })
    .then((newMealPlan) => {
      console.log(newMealPlan);
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe11, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....11");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe12, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....12");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe21, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....21");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe22, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....22");

      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe31, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....31");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe32, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....32");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe41, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....41");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe42, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....42");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe51, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....51");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe52, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....52");

      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe61, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....61");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe62, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....62");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe71, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then((newMealPlan) => {
      console.log("this is the number.....71");
      return Recipe.findByIdAndUpdate(newMealPlan.mealRecipe72, {
        $push: { weeklyPlan: newMealPlan._id },
      });
    })
    .then(res.json(response))
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
    .populate("mealRecipe11")
    .populate("mealRecipe12")
    .populate("mealRecipe21")
    .populate("mealRecipe22")
    .populate("mealRecipe31")
    .populate("mealRecipe32")
    .populate("mealRecipe41")
    .populate("mealRecipe42")
    .populate("mealRecipe51")
    .populate("mealRecipe52")
    .populate("mealRecipe61")
    .populate("mealRecipe62")
    .populate("mealRecipe71")
    .populate("mealRecipe72")
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
