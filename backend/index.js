import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import discussionRoutes from "./routes/discussions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

/* =======================
   MIDDLEWARES
   ======================= */
app.use(cors({
  origin: [
    "https://oa-discussion.netlify.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

/* =======================
   ROUTES
   ======================= */
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/discussions", discussionRoutes);

/* =======================
   DATABASE
   ======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
