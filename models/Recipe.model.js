const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    img: String,
    title: { type: String, required: true },
    description: { type: String, required: true },
    serving: { type: Number },
    protein: {
      type: String,
      enum: ["Meat", "Fish", "Eggs", "Legumes", "Seeds and nuts"],
    },
    ingredients: {
      type: Array,
      items: { id: String, ingredient: String, quantity: String },
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
