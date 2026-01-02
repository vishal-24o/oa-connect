import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import discussionRoutes from "./routes/discussions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

/* Middlewares */
app.use(
  cors({
    origin: [
      "https://oa-discussion.netlify.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.options("*", cors());
app.use(express.json());
app.use("/api/discussions", discussionRoutes);

/* Root check */
app.get("/", (req, res) => {
  res.send("API running");
});

/* STEP 2: Dummy discussions API */
app.get("/api/discussions", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Amazon OA – SDE Intern",
      company: "Amazon",
      difficulty: "Medium",
      author: "demo-user"
    },
    {
      id: 2,
      title: "Google OA – SWE",
      company: "Google",
      difficulty: "Hard",
      author: "demo-user"
    }
  ]);
});

/* MongoDB connection */
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
