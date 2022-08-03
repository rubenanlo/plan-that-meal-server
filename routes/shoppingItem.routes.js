const router = require("express").Router();
// const mongoose = require('mongoose');

const ShoppingItem = require("../models/ShoppingItem.model");

//  POST /api/ShoppingItems  -  Creates a new ShoppingItem
router.post("/ShoppingItems", (req, res, next) => {
  const { description } = req.body;

  ShoppingItem.create({ description })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
