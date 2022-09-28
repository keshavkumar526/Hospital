const mongoose = require("mongoose");

const HospitalDetailSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    hospitalName: {
      type: String,
      max: 500,
    },
    blockNo: {
      type: String,
      max: 500,
    },
    Area: {
      type: String,
      max: 500,
    },
    Pincode: {
      type: String,
      max: 500,
    },
    City: {
      type: String,
      max: 500,
    },
    State: {
      type: String,
      max: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HospitalDetail", HospitalDetailSchema);
