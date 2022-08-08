const { Schema, model } = require("mongoose");

const weeklyplanSchema = new Schema(
  {
    startDate: {
      type: Date,
      min: "2020-12-27",
      default: () => Date.now(),
    },

    mealRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    // mealRecipe11: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe12: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe21: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe22: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe31: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe32: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe41: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe42: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe51: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe52: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe61: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe62: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe71: { type: Schema.Types.ObjectId, ref: "Recipe" },
    // mealRecipe72: { type: Schema.Types.ObjectId, ref: "Recipe" },

    // dailyPlan: {
    //   type: Array,
    //   meal: {
    //     mealRecipe: { type: Schema.Types.ObjectId, ref: "Recipe" },
    //   },
    // },
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

const WeeklyPlan = model("WeeklyPlan", weeklyplanSchema);

module.exports = WeeklyPlan;
