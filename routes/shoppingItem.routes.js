const router = require("express").Router();
// const mongoose = require('mongoose');

const ShoppingItem = require("../models/ShoppingItem.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//READ list of recipes
router.get("/shoppingitems", (req, res, next) => {
  ShoppingItem.find()
    .then((allShoppingItems) => {
      res.json(allShoppingItems);
    })
    .catch((err) => res.json(err));
});

//  POST /api/ShoppingItems  -  Creates a new ShoppingItem
router.post("/shoppingitems", isAuthenticated, (req, res, next) => {
  ShoppingItem.create({ description: req.body.description })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
