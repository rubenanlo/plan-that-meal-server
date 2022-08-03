const { Schema, model } = require("mongoose");

const weeklyplanSchema = new Schema(
  {
    date: { type: Date, min: "2020-12-27" },
    protein: {
      type: String,
      enum: ["Meat", "Fish", "Eggs", "Legumes", "Seeds and nuts"],
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
    createdAt: true,
    updatedAt: true,
  }
);

const WeeklyPlan = model("WeeklyPlan", weeklyplanSchema);

module.exports = WeeklyPlan;
