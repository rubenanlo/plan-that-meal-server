const { Schema, model } = require("mongoose");

const weeklyplanSchema = new Schema(
  {
    imagePlan: {
      type: String,
    },
    startDate: {
      type: Date,
      min: "2020-12-27",
      default: () => Date.now(),
    },
    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner"],
    },
    weeklyRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
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
