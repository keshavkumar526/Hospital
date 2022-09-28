const multer = require("multer");
const pdfFileSchema = require("../models/pdfFile");
const User = require("../models/user");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

exports.upload = multer({ storage: storage });

exports.singleFileUpload = async (req, res, next) => {
  const { userId } = req.body;
  const user = await User.findById({ _id: userId }).exec();
  !user && res.status(404).send("User not found");
  try {
    const file = new pdfFileSchema({
      userId: userId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      //   fileSize: fileSizeFormatter(req.file.size, 2), // 0.00
    });
    await file.save();
    res.status(201).send("File Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getallSingleFiles = async (req, res, next) => {
  const { userId } = req.body;
  console.log(userId)
  const user = await User.findById({ _id: userId }).exec();
  !user && res.status(404).send("User not found");
  try {
    const files = await pdfFileSchema.findOne({ userId: userId });
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// exports.fileSizeFormatter = (bytes, decimal) => {
//   if (bytes === 0) {
//     return "0 Bytes";
//   }
//   const dm = decimal || 2;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
//   const index = Math.floor(Math.log(bytes) / Math.log(1000));
//   return (
//     parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
//   );
// };
