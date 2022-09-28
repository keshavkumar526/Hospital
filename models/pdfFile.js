const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pdfFileSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pdfFile", pdfFileSchema);
