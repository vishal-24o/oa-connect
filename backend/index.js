import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import discussionRoutes from "./routes/discussions.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

/* =========================
   CORS — FINAL & CLEAN
   ========================= */
app.use(
  cors({
    origin: [
      "https://oa-discussion.netlify.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-user-id",
    ],
    credentials: true,
  })
);

/* =========================
   Middlewares
   ========================= */
app.use(express.json());

/* =========================
   Routes
   ========================= */
app.use("/api/auth", authRoutes);
app.use("/api/discussions", discussionRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

/* =========================
   MongoDB
   ========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "LOADED" : "MISSING");
