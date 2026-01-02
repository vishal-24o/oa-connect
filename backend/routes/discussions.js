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
    res.status(500).json({ message: "Failed to fetch discussions" });
  }
});

/* ===============================
   GET single discussion by ID
   =============================== */
router.get("/:id", async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    res.json(discussion);
  } catch (err) {
    res.status(400).json({ message: "Invalid discussion ID" });
  }
});

/* ===============================
   CREATE discussion
   =============================== */
router.post("/", async (req, res) => {
  console.log("📩 POST /api/discussions HIT");
  console.log("BODY:", req.body);

  try {
    const discussion = new Discussion(req.body);
    const saved = await discussion.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ SAVE ERROR:", err.message);
    res.status(400).json({ message: err.message });
  }
});

/* ===============================
   DELETE discussion (author only)
   =============================== */
router.delete("/:id", async (req, res) => {
  try {
    const { authorId } = req.body;
    const { id } = req.params;

    if (!authorId) {
      return res.status(401).json({ message: "Author ID required" });
    }

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found" });
    }

    if (discussion.authorId !== authorId) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await discussion.deleteOne();
    res.json({ message: "Discussion deleted successfully" });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err);
    res.status(500).json({ message: "Failed to delete discussion" });
  }
});

export default router;
