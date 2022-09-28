const mailgun = require("mailgun-js");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HospitalDetail = require("../models/hospitalDetails");
const InChargeDetail = require("../models/InChargeDetail");
// const pdfService = require("../PdfTemplate/pdftemplate");

const DOMAIN = "sandbox20d491ccef4e494f87c778e0b197904f.mailgun.org";
const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

exports.signup = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).exec();

    if (user && user.verified) {
      return res
        .status(400)
        .json({ error: "User with this email already exists and verified" });
    }

    let token;
    if (user && user.token) {
      token = user.token;
    } else {
      token = jwt.sign({ email }, process.env.JWT_ACC_ACTIVATE);
    }
    console.log(user, email);
    if (!user) {
      let newUser = new User({
        email,
        token,
      });
      newUser = await newUser.save();
    }

    const data = {
      from: "noreply@hello.com",
      to: email,
      subject: "Account Activation Link",
      html: `
          <h2>Please click on given link to activate your account</h2>
          <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
      `,
    };
    mg.messages().send(data, function (error, body) {
      if (error) {
        return res.json({
          error: err.message,
        });
      }
      return res.json({
        message: "Email has been sent, Kindly activate your account ",
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "error" });
  }
};

exports.activateAccount = async (req, res) => {
  const { token, password } = req.body;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACC_ACTIVATE,
      async (err, decodedToken) => {
        if (err) {
          return res.status(400).json({ error: "Incorrect or expired Link" });
        }

        try {
          console.log(decodedToken);
          const { email } = decodedToken;
          const user = await User.findOne({ email }).exec();
          if (!user) {
            return res
              .status(400)
              .json({ error: "User with this email not exists" });
          }
          if (user.token !== token) {
            return res.status(400).json({ error: "Token is incorrect" });
          }
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const updatedUser = await User.findByIdAndUpdate(user._id, {
            password: hashedPassword,
            verified: true,
          });
          updatedUser.password = null;
          res.status(200).send(updatedUser);
        } catch (e) {
          console.log(e);
          return res.status(400).json({ error: "password is not valid" });
        }
      }
    );
  }
};

exports.HospitalDetails = async (req, res) => {
  console.log(req.body);
  const { userId, hospitalname, blockNumber, area, pincode, City, State } =
    req.body;
  try {
    const user = await User.findById({ _id: userId }).exec();
    !user && res.status(404).send("User not found");
    if (user) {
      let newDetail = new HospitalDetail({
        userId: userId,
        hospitalName: hospitalname,
        blockNo: blockNumber,
        Area: area,
        Pincode: pincode,
        City: City,
        State: State,
      });
      newDetail = await newDetail.save();
      res.status(200).send(newDetail);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "error" });
  }
};

exports.InChargeDetails = async (req, res) => {
  console.log(req.body);
  const { userId, name, mobileNumber, registrationNumber, council, email } =
    req.body;
  try {
    const user = await User.findById({ _id: userId }).exec();
    !user && res.status(404).send("User not found");
    if (user) {
      let newDetail = new InChargeDetail({
        userId: userId,
        Name: name,
        MobileNo: mobileNumber,
        RegistrationNumber: registrationNumber,
        Council: council,
        Email: email,
      });
      newDetail = await newDetail.save();
      res.status(200).send(newDetail);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "error" });
  }
};

// exports.createPdf = async (req, res) => {
//   console.log(req.body);

//   try {
//     const user = await User.findById({ _id: userId }).exec();
//     !user && res.status(404).send("User not found");
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json({ error: "error" });
//   }
// };
