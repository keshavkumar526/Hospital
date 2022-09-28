const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    token: String,
    password: {
      type: String,
    //   required: true,
      min: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
