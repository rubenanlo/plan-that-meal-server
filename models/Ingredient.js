const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const ingredientSchema = new Schema(
  {
    img: { String },
    title: { String, required: true },
    description: { String, required: true },
    serving: number,
    ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredients" }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;
