const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/connectDb");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

// import routes
const authRoutes = require("./routes/auth");
const serviceRoutes = require("./routes/service");
const addPatientRoutes = require("./routes/addPatient");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// middlewares
app.use("/api", authRoutes);
app.use("/api/establish", serviceRoutes);
app.use("/api/patient", addPatientRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
