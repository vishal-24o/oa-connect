import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    tags: {
      type: [String],
      default: [],
    },
    question: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Discussion", discussionSchema);
