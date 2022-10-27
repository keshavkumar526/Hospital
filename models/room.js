const mongoose = require("mongoose");

const roomSchema = {
  userId: String,
  name:  String,
  detail: String,
  category: String,
  bed: [
    {
      name: String,
      charge: String,
    },
  ],
};

module.exports = mongoose.model("Room", roomSchema);
