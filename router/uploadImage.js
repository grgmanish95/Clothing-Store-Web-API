const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require("../Authorization/authorization");

const storage = multer.diskStorage({
  destination: "./pictures/uploadedImages",

  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/i)) {
    let err = new Error("Only image files are allowed");
    err.status = 400;
    return cb(err, false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 1920 * 1080 },
});

uploadRouter = express.Router();
uploadRouter
  .route("/")
  .post(auth.verifyAdmin, upload.single("myFile"), (req, res, next) => {
    console.log(req.file);
    res.json({
      file: req.file,
    });
  });

module.exports = uploadRouter;
