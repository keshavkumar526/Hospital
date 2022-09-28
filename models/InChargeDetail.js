const mongoose = require("mongoose");

const InChargeDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      max: 500,
    },
    MobileNo: {
      type: String,
      max: 500,
    },
    RegistrationNumber: {
      type: String,
      max: 500,
    },
    Council: {
      type: String,
      max: 500,
    },
    Email: {
      type: String,
      max: 500,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("InChargeDetail", InChargeDetailSchema);
