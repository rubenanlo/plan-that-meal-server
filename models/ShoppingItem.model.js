const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
