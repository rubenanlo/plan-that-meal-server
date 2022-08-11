const { Schema, model } = require("mongoose");

const weeklyplanSchema = new Schema(
  {
    startDate: {
      type: Date,
      default: () => Date.now(),
    },

    mealRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
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
