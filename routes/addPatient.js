const express = require("express");
const router = express.Router();

const { addPatient, fetchPatient } = require("../controllers/addPatient");

router.post("/addPatient", addPatient);
router.get("/getPatient/:userId", fetchPatient);
// router.get("/getService/:userId", fetchService);

module.exports = router;
