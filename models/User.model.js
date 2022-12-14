const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/],
  },
  username: {
    unique: true,
    type: String,
    required: [true, "You need to have a name"],
  },
});
const User = model("User", userSchema);

module.exports = User;
