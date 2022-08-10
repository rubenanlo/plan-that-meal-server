const router = require("express").Router();
const mongoose = require("mongoose");

const ShoppingItem = require("../models/ShoppingItem.model");
const User = require("../models/User.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

//READ list of shopping items
router.get("/shoppingitems", isAuthenticated, (req, res, next) => {
  ShoppingItem.find()
    .populate("user")
    .then((shoppingLists) => {
      const userShoppingList = shoppingLists.filter(
        (list) => list.user._id == req.payload._id
      );
      res.json(userShoppingList);
    })
    .catch((err) => res.json(err));
});

//READ shooping list details
router.get(
  "/shoppingitems/:shoppingListId",
  isAuthenticated,
  (req, res, next) => {
    const { shoppingListId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shoppingListId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    ShoppingItem.findById(shoppingListId)
      .then((shoppingList) => res.json(shoppingList))
      .catch((error) => res.json(error));
  }
);

//  POST /api/ShoppingItems  -  Creates a new ShoppingItem
router.post("/shoppingitems", isAuthenticated, (req, res, next) => {
  ShoppingItem.create({
    items: req.body.items,
    user: req.payload._id,
  })
    .then((response) =>
      // console.log("this is the response --> ", response))
      res.json(response)
    )
    .catch((err) => res.json(err));
});

//UPDATE shopping list
router.put(
  "/shoppingitems/:shoppingListId",
  isAuthenticated,
  (req, res, next) => {
    const { shoppingListId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(shoppingListId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    ShoppingItem.findByIdAndUpdate(shoppingListId, req.body, {
      returnDocument: "after",
    })
      .then((updatedList) => res.json(updatedList))
      .catch((error) => res.json(error));
  }
);

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
