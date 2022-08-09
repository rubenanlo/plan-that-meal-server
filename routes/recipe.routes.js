const router = require("express").Router();

const mongoose = require("mongoose");

const fileUploader = require("../config/cloudinary.config");

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const WeeklyPlan = require("../models/WeeklyPlan.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

//READ list of recipes
router.get("/recipes", isAuthenticated, (req, res, next) => {
  Recipe.find()
    .populate("user")
    .populate("weeklyPlan")
    .then((allRecipes) => {
      res.json(allRecipes);
    })
    .catch((err) => res.json(err));
});

// CREATE IMAGE
router.post(
  "/upload",
  fileUploader.single("img"),
  isAuthenticated,
  (req, res, next) => {
    console.log(req.file.path);
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    res.json({ fileUrl: req.file.path });
  }
);

//CREATE new recipe
router.post("/recipes", isAuthenticated, (req, res, next) => {
  Recipe.create({
    img: req.body.img,
    title: req.body.title,
    description: req.body.description,
    serving: req.body.serving,
    protein: req.body.protein,
    ingredients: req.body.ingredients,
    user: req.payload._id,
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//GET A RANDOM recipe
router.get("/recipes/random", isAuthenticated, (req, res, next) => {
  Recipe.find()
    .populate("user")
    .populate("weeklyPlan")
    .then((allRecipes) => {
      const random = Math.floor(Math.random() * allRecipes.length);
      res.json(allRecipes[random]);
    })
    .catch((err) => res.json(err));
});

//READ recipe details
router.get("/recipes/:recipeId", isAuthenticated, (req, res, next) => {
  const { recipeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Recipe.findById(recipeId)
    .populate("user")
    .then((recipe) => res.json(recipe))
    .catch((error) => res.json(error));
});

//UPDATE recipe
router.put(
  "/recipes/:recipeId",
  isAuthenticated,
  fileUploader.single("img"),
  (req, res, next) => {
    const { recipeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    Recipe.findByIdAndUpdate(recipeId, req.body, { returnDocument: "after" })
      .then((updatedRecipe) => res.json(updatedRecipe))
      .catch((error) => res.json(error));
  }
);

module.exports = router;
