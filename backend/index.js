import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import discussionRoutes from "./routes/discussions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

/* =========================
   CORS — FINAL FIX
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
      "x-user-id", // ✅ THIS WAS MISSING AT RUNTIME
    ],
  })
);

/* ✅ Preflight handler (NO wildcard) */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, x-user-id"
    );
    return res.sendStatus(204);
  }
  next();
});

/* =========================
   Middlewares
   ========================= */
app.use(express.json());

/* =========================
   Routes
   ========================= */
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
