import express from "express";
import Discussion from "../models/Discussion.js";

const router = express.Router();

/* ===============================
   GET all discussions
   =============================== */
router.get("/", async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (err) {
    console.error("GET ALL ERROR:", err);
    res.status(500).json({ message: "Failed to fetch discussions" });
  }
});

/* ===============================
   GET single discussion
   =============================== */
router.get("/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }
    res.json(discussion);
  } catch (err) {
    console.error("GET ONE ERROR:", err);
    res.status(400).json({ message: "Invalid discussion ID" });
  }
});

/* ===============================
   CREATE discussion
   =============================== */
router.post("/", async (req, res) => {
  try {
    const discussion = new Discussion(req.body);
    const saved = await discussion.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(400).json({ message: err.message });
  }
});

/* ===============================
   DELETE discussion (OWNER ONLY)
   =============================== */
router.delete("/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    const currentUserId = req.headers["x-user-id"];

    if (!currentUserId) {
      return res.status(401).json({ message: "User ID missing" });
    }

    // ✅ FORCE string comparison (important)
    if (String(discussion.authorId) !== String(currentUserId)) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await Discussion.findByIdAndDelete(req.params.id);

    res.json({ message: "Discussion deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
