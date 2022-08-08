const router = require("express").Router();
const mongoose = require("mongoose");

const ShoppingItem = require("../models/ShoppingItem.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//READ list of recipes
router.get("/shoppingitems", isAuthenticated, (req, res, next) => {
  ShoppingItem.find()
    .then((allShoppingItems) => {
      res.json(allShoppingItems);
    })
    .catch((err) => res.json(err));
});

//  POST /api/ShoppingItems  -  Creates a new ShoppingItem
router.post("/shoppingitems", isAuthenticated, (req, res, next) => {
  ShoppingItem.create({
    description: req.body.description,
    // quantity: req.body.quantity,
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//DELETE shooping item
router.delete(
  "/shoppingitems/:shoppingitemsId",
  isAuthenticated,
  (req, res, next) => {
    const { shoppingitemsId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shoppingitemsId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    ShoppingItem.findByIdAndRemove(shoppingitemsId)
      .then(() =>
        res.json({
          message: `Shopping item with id ${shoppingitemsId} was removed successfully.`,
        })
      )
      .catch((error) => res.status(500).json(error));
  }
);

module.exports = router;
