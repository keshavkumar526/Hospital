const User = require("../models/user");
const Service = require("../models/service");

exports.addService = async (req, res) => {
  const userId = req.body.userId;
  const serviceName = req.body.name;
  const serviceCategory = req.body.category;
  const serviceCharge = req.body.charge;
  try {
    const user = await User.findById({ _id: userId }).exec();
    //   const checkRoom = await Room.findOne({ userId: userId, name: roomName }).exec();
    //   checkRoom && res.status(400).send("Room found");

    !user && res.status(404).send("User not found");
    if (user) {
      let serviceDetails = new Service({
        userId: userId,
        name: serviceName,
        category: serviceCategory,
        charge: serviceCharge,
      });
      await serviceDetails.save();
      res.status(200).send({ message: "Service Details Saved" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.fetchService = async (req, res) => {
  const user_Id = req.params.userId;
  try {
    const user = await User.findById({ _id: user_Id }).exec();
    !user && res.status(404).send("User not found");
    if (user) {
      const services = await Service.find({ userId: user_Id });
      res.status(200).json(services);
    }
  } catch (err) {
    console.log(err);
  }
};
