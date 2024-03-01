import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/user.js";
import cloudinary from "cloudinary";
import { sendToken } from "../utilities/jwt.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User Pic Is Required!", 400));
  }
  const { profilePic } = req.files;
  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/avif",
  ];
  if (!allowedFormats.includes(profilePic.mimetype)) {
    return next(
      new ErrorHandler(
        "Please provide profile Picture in png,jpg,webp or avif format!",
        400
      )
    );
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill requied fields!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    profilePic.tempFilePath
  );
  if (!cloudinaryResponse || cloudinary.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown cloudinary error!"
    );
  }
  user = await User.create({
    name,
    email,
    password,
    profilePic: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  sendToken("User Registered!", user, res, 200);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }
  sendToken("User Logged In!", user, res, 200);
});

export const logout = catchAsyncErrors((req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "You are logged out!",
    });
});
export const myProfile = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});