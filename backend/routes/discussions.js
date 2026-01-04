import express from "express";
import jwt from "jsonwebtoken";
import Discussion from "../models/Discussion.js";

const router = express.Router();

/* ===============================
   AUTH MIDDLEWARE (JWT)
   =============================== */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

/* ===============================
   GET all discussions (public)
   =============================== */
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch discussions" });
  }
});

/* ===============================
   GET single discussion (public)
   =============================== */
router.get("/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }
    res.json(discussion);
  } catch {
    res.status(400).json({ message: "Invalid discussion ID" });
  }
});

/* ===============================
   CREATE discussion (auth)
   =============================== */
router.post("/", requireAuth, async (req, res) => {
  try {
    const discussion = new Discussion({
      ...req.body,
      authorId: req.userId,
    });

    const saved = await discussion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ===============================
   DELETE discussion (owner only)
   =============================== */
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    if (String(discussion.authorId) !== String(req.userId)) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await discussion.deleteOne();
    res.json({ message: "Discussion deleted successfully" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
