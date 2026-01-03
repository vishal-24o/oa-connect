import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import discussionRoutes from "./routes/discussions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

/* =========================
   CORS (Node 22 SAFE)
   ========================= */
const corsOptions = {
  origin: [
    "https://oa-discussion.netlify.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-user-id", // ✅ REQUIRED
  ],
};

app.use(cors(corsOptions));

/* ✅ SAFE preflight handler (NO wildcard route) */
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
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

/* Root */
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
