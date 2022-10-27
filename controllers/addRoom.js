const Room = require("../models/room.js");
const User = require("../models/user");

exports.addRoom = async (req, res) => {
  const userId = req.body.userId;
  const roomName = req.body.name;
  const roomDetail = req.body.detail;
  const roomCategory = req.body.category;
  const roomBedDetail = req.body.bed;
  try {
    const user = await User.findById({ _id: userId }).exec();
    const checkRoom = await Room.findOne({ userId: userId, name: roomName }).exec();
    checkRoom && res.status(400).send("Room found");

    !user && res.status(404).send("User not found");
    if (user && !checkRoom) {
      let roomDetails = new Room({
        userId: userId,
        name: roomName,
        detail: roomDetail,
        category: roomCategory,
        bed: {
          name: roomBedDetail.name,
          charge: roomBedDetail.charge,
        },
      });
      roomDetails = await roomDetails.save();
      res.status(200).send({ message: "Room Details Saved" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.fetchRoom = async (req, res) => {
  const user_Id = req.params.userId;
  try {
    const user = await User.findById({ _id: user_Id }).exec();
    !user && res.status(404).send("User not found");
    if (user) {
      const rooms = await Room.find({ userId: user_Id });
      res.status(200).json(rooms);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.addBed = async (req, res) => {
  const userId = req.body.userId;
  const roomName = req.body.roomName;
  console.log(roomName);
  const roomBedDetail = req.body.bed;
  try {
    const user = await User.findById({ _id: userId }).exec();
    !user && res.status(404).send("User not found");
    if (user) {
      const room = await Room.findOneAndUpdate({ userId: userId, name: roomName },{
        $push: {
          bed: { name: roomBedDetail.name, charge: roomBedDetail.charge },
        },
      });
      if(room === null){
        res.status(400).send({ message: "Room not found" });
      }
      res.status(200).send({ message: "Bed Details Saved" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.fetchBed = async (req, res) => {
  const user_Id = req.body.userId;
  const roomName = req.body.roomName;
  try {
    const user = await User.findById({ _id: user_Id }).exec();
    !user && res.status(404).send("User not found");
    if (user) {
      const room = await Room.find({  userId: user_Id }, {bed: 1})
      res.status(200).json(room);
    }
  } catch (err) {
    console.log(err);
  }
};
