const { Schema, model } = require("mongoose");

const shoppingitemSchema = new Schema(
  {
    date: {
      type: Date,
      default: () => Date.now(),
    },
    items: {
      type: Array,
      itemSet: {
        id: String,
        description: String,
        quantity: String,
        isSelected: {
          type: Boolean,
          default: false,
        },
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

const ShoppingItem = model("ShoppingItem", shoppingitemSchema);

module.exports = ShoppingItem;
