const express = require("express");
const router = express.Router();

const { addService, fetchService } = require("../controllers/service");

router.post("/addService", addService);
router.get("/getService/:userId", fetchService);

module.exports = router;
