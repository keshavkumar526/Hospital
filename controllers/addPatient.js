const User = require("../models/user");
const Patient = require("../models/patient");

exports.addPatient = async (req, res) => {
  const userId = req.body.userId;
  const patientFirstName = req.body.firstName;
  const patientMiddleName = req.body.middleName;
  const patientLastName = req.body.lastName;
  const patientProfilePic = req.body.profilePic;
  const patientDOB = req.body.DOB;
  const patientPhoneNo = req.body.phoneNo;
  const patientInsuranceNo = req.body.insuranceNo;
  const patientAge = req.body.age;
  const patientGender = req.body.gender;
  const patientCurrentAddress = {
    patientArea: req.body.currentAddress.area,
    patientVillage: req.body.currentAddress.village,
    patientCity: req.body.currentAddress.city,
    patientPincode: req.body.currentAddress.pinCode,
    patientState: req.body.currentAddress.state,
  };
  const patientPermanentAddress = {
    patientArea: req.body.permanentAddress.area,
    patientVillage: req.body.permanentAddress.village,
    patientCity: req.body.permanentAddress.city,
    patientPincode: req.body.permanentAddress.pinCode,
    patientState: req.body.permanentAddress.state,
  };
  const patientCareTakerDetails = {
    patientContactName: req.body.CareTakerDetails.contactName,
    patientPhoneNo: req.body.CareTakerDetails.phoneNo,
    patientAddress: req.body.CareTakerDetails.address,
  };
  try {
    const user = await User.findById({ _id: userId }).exec();
    !user && res.status(404).send("User not found");
    if (user) {
      let patientDetails = new Patient({
        userId: userId,
        firstName: patientFirstName,
        middleName: patientMiddleName,
        lastName: patientLastName,
        profilePic:patientProfilePic,
        DOB: patientDOB,
        phoneNo: patientPhoneNo,
        insuranceNo: patientInsuranceNo,
        Age: patientAge,
        Gender: patientGender,
        currentAddress: {
          area: patientCurrentAddress.patientArea,
          village: patientCurrentAddress.patientVillage,
          city: patientCurrentAddress.patientCity,
          pinCode: patientCurrentAddress.patientPincode,
          state: patientCurrentAddress.patientState,
        },
        permanentAddress: {
          area: patientPermanentAddress.patientArea,
          village: patientPermanentAddress.patientVillage,
          city: patientPermanentAddress.patientCity,
          pinCode: patientPermanentAddress.patientPincode,
          state: patientPermanentAddress.patientState,
        },
        careTakerDetails: {
          contactName: patientCareTakerDetails.patientContactName,
          phoneNo: patientCareTakerDetails.patientPhoneNo,
          address: patientCareTakerDetails.patientAddress,
        },
      });
      await patientDetails.save();
      res.status(200).send({ message: "patient Details Saved" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.fetchPatient = async (req, res) => {
    const user_Id = req.params.userId;
    try {
      const user = await User.findById({ _id: user_Id }).exec();
      !user && res.status(404).send("User not found");
      if (user) {
        const patients = await Patient.find({ userId: user_Id });
        res.status(200).json(patients);
      }
    } catch (err) {
      console.log(err);
    }
  };
