const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/UserModel");
const ErrorHandler = require("../utils/errorHandler");
const path = require("path");
const fs = require("fs");
const JWT = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting File" });
        }
      });
      return next(new ErrorHandler("user Already Exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate you account",
        text: `Hello ${user.name}. Please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(200).json({
        success: true,
        message: "Please check your email to activate your account ",
      });
    } catch (error) {
      return next(new ErrorHandler(err.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(err.message, 400));
  }
});

//function to create activation token
const createActivationToken = (user) => {
  return JWT.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUserData = JWT.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newUserData) return next(new ErrorHandler("Invalid Token", 400));
      const newUser = await User.create(newUserData);
      sendToken(newUser, 201, res);
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.post(
  "/login",
  catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler("Please provide all fields", 400));
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) return next(new ErrorHandler("User not found", 404));

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword)
        return next(new ErrorHandler("Password error", 400));

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

module.exports = router;
