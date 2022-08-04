const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const recipeSchema = new Schema(
  {
    img: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    serving: Number,
    protein: {
      type: String,
      enum: ["Meat", "Fish", "Eggs", "Legumes", "Seeds and nuts"],
    },
    ingredients: {
      type: Array,
      items: [{ ingredient: String, quantity: String }],
    },

    weeklyPlan: [{ type: Schema.Types.ObjectId, ref: "WeeklyPlan" }],
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

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
