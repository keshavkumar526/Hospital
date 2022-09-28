const express = require("express");
const router = express.Router();

// import controller
const {
  signup,
  activateAccount,
  HospitalDetails,
  InChargeDetails,
} = require("../controllers/auth");
const uploadPdf = require("../controllers/fileUplaod");
const { upload,singleFileUpload,getallSingleFiles } = require("../controllers/fileUplaod");

router.post("/signup", signup);
router.post("/email-activate", activateAccount);
router.post("/hospital-detail", HospitalDetails);
router.post("/Incharge-detail", InChargeDetails);
router.post('/singleFile', upload.single('file'), singleFileUpload);
router.post('/getSingleFile', getallSingleFiles);
// router.post("/upload-pdf", uploadPdf);

module.exports = router;
