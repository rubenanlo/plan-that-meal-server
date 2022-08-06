const { Schema, model } = require("mongoose");

const shoppingitemSchema = new Schema(
  {
    description: { type: String },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const ShoppingItem = model("ShoppingItem", shoppingitemSchema);

module.exports = ShoppingItem;
