const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
    type: String,
    unique: true,
    required: [true, "You need to have a name"],
  },
});
const User = model("User", userSchema);

module.exports = User;
