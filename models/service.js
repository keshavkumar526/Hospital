const mongoose = require("mongoose");

const serviceSchema = {
  userId: String,
  name: String,
  category: String,
  charge: String,
};

module.exports = mongoose.model("Service", serviceSchema);
