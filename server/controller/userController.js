const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/UserModel");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  const userEmail = await User.findOne({ email });
  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error deleting File" });
      } else {
        res.json({ message: "file deleted successfully " });
      }
    });
    return next(new ErrorHandler("User already exists", 400));
  }
  const filename = req.file.filename;
  const fileUrl = path.join(filename);
  const user = {
    name,
    email,
    password,
    avatar: fileUrl,
  };
  const newUser = await User.create(user);
  res.status(200).json({ success: true, newUser });
});

module.exports = router;
