const { Schema, model } = require("mongoose");

const shoppingitemSchema = new Schema(
  {
    date: {
      type: Date,
      default: () => Date.now(),
    },
    items: [{ description: String, quantity: String }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

const ShoppingItem = model("ShoppingItem", shoppingitemSchema);

module.exports = ShoppingItem;
