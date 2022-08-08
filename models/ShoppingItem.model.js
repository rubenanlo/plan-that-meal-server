const { Schema, model } = require("mongoose");

const shoppingitemSchema = new Schema(
  {
    description: { type: String },
  },
  {
    quantity: { type: String },
  },
  {
    timestamps: true,
  }
);

const ShoppingItem = model("ShoppingItem", shoppingitemSchema);

module.exports = ShoppingItem;
