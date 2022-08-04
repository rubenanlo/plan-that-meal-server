require("dotenv/config");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/plan-that-meal-server";

module.exports = MONGO_URI;
