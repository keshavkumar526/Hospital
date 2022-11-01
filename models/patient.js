const mongoose = require("mongoose");

const patientSchema = {
  userId: String,
  firstName: String,
  middleName: String,
  lastName: String,
  profilePic: { type: String, default: "" },
  DOB: String,
  phoneNo: String,
  insuranceNo: String,
  Age: String,
  Gender: String,
  currentAddress: {
    area: String,
    village: String,
    city: String,
    pinCode: String,
    state: String,
  },
  permanentAddress: {
    area: String,
    village: String,
    city: String,
    pincode: String,
    state: String,
  },
  careTakerDetails: {
    contactName: String,
    phoneNo: String,
    address: String,
  },
};

module.exports = mongoose.model("Patient", patientSchema);
