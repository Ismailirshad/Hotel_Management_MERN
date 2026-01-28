import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../schema/userSchema.js";
import sendEmail from "../../email/nodemailer.js";
import OtpTemplate from "../../email/forgotPassword.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(500).json({ message: "User alreadt exits" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      samSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    const { _id } = user;
    res.status(201).json({
      message: "User created successfully",
      user: { _id, name, email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = req.cookies;
    // Checks user already loggedIn or not ?
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const existUser = await User.findById(decoded.id);
        if (existUser && existUser.email == email) {
          return res.status(200).json({ message: "User already logged In" });
        }
      } catch (error) {
        console.log("Invalid or expired token");
      }
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User does not exists" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials" });

    const newtoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", newtoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      samSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      samSite: process.env.NODE_ENV == "production" ? "none" : "strict",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Generate and send OTP logic here
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(user.email, "Your Reset Code", OtpTemplate(otp));

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("Error in sendOtp controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { otp, email } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }
  try {
    const user = await User.findOne({email});

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.resetOtp !== otp || user.resetOtpExpires < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.log("Error in verifyOtp controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log("Error in resetPassword controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
