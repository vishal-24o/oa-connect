import express from "express";
import jwt from "jsonwebtoken";
import Otp from "../models/Otp.js";
import User from "../models/User.js";
import { sendOtpEmail } from "../utils/sendOtpEmail.js";

const router = express.Router();

/* ===============================
   Helper: Generate 6-digit OTP
   =============================== */
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* ===============================
   REQUEST OTP
   POST /api/auth/request-otp
   =============================== */
router.post("/request-otp", async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const now = new Date();

    // Resend rule (1 min)
    const existingOtp = await Otp.findOne({ email });
    if (existingOtp && now < existingOtp.resendAfter) {
      return res.status(429).json({
        message: "Please wait before requesting another OTP",
      });
    }

    // Create user if not exists
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name: name || "User",
        email,
        isVerified: false,
      });
    }

    // Generate OTP
    const otp = generateOtp();

    // Clear old OTPs
    await Otp.deleteMany({ email });

    // Save OTP (10 min expiry, 1 min resend)
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(now.getTime() + 10 * 60 * 1000),
      resendAfter: new Date(now.getTime() + 1 * 60 * 1000),
    });

    // ✅ SEND OTP VIA EMAIL
    await sendOtpEmail(email, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("REQUEST OTP ERROR:", err);
    res.status(500).json({ message: "Failed to request OTP" });
  }
});

/* ===============================
   VERIFY OTP + ISSUE JWT
   POST /api/auth/verify-otp
   =============================== */
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    const otpDoc = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (otpDoc.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otpDoc.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Verify user
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Cleanup OTPs
    await Otp.deleteMany({ email });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ message: "OTP verification failed" });
  }
});

export default router;
