import express from "express";
import {
  getProfile,
  login,
  logout,
  resetPassword,
  sendOtp,
  signup,
  verifyOtp,
} from "../../controllers/user/authController.js";
import { protectRoute } from "../../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/profile", protectRoute, getProfile);
authRouter.post("/sendOtp", sendOtp);
authRouter.post("/verifyOtp", verifyOtp);
authRouter.post("/resetPassword", resetPassword);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    // Create token
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Option 1: Send token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Option 2 (or both): Redirect with token in URL (not preferred for security)
    res.redirect("http://localhost:5173");
  },
);


export default authRouter;
