const express = require("express");
const router = express.Router();

// import controller
const {
  signup,
  activateAccount,
  HospitalDetails,
  InChargeDetails,
  login,
} = require("../controllers/auth");
const uploadPdf = require("../controllers/fileUplaod");
const {
  upload,
  singleFileUpload,
  getallSingleFiles,
} = require("../controllers/fileUplaod");
const {
  addRoom,
  fetchRoom,
  addBed,
  fetchBed,
} = require("../controllers/addRoom");

router.post("/signup", signup);
router.post("/login", login);
router.post("/email-activate", activateAccount);
router.post("/hospital-detail", HospitalDetails);
router.post("/Incharge-detail", InChargeDetails);
router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/getSingleFile", getallSingleFiles);
router.post("/addRoom", addRoom);
router.get("/getRoom/:userId", fetchRoom);
router.post("/addBed", addBed);
router.post("/getBed", fetchBed);
// router.post("/upload-pdf", uploadPdf);

module.exports = router;
