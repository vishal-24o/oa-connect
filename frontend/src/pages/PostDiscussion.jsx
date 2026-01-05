import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { createDiscussion } from "../api/discussions";
import { getCurrentUserId } from "../utils/auth";

export default function PostDiscussion() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    role: "",
    difficulty: "Medium",
    tags: "",
    question: "",
    solution: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("SUBMIT CLICKED");
    e.preventDefault();
    setLoading(true);

    const newDiscussion = {
      title: formData.title.trim(),
      company: formData.company.trim(),
      role: formData.role.trim(),
      difficulty: formData.difficulty,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      question: formData.question.trim(),
      solution: formData.solution.trim(),
      authorId: getCurrentUserId(),
    };

    try {
      await createDiscussion(newDiscussion);
      navigate("/discussions");
    } catch (err) {
      console.error("Failed to create discussion", err);
      alert("Failed to publish discussion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-6 py-28">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Post a New Discussion
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Your post is saved permanently and visible to everyone.
        </p>

        <form
        onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
        }}
        className="mt-10 space-y-6"
        >

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Discussion title"
            className="w-full px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="Company"
              className="px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
            />
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder="Role (e.g. SDE Intern)"
              className="px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
            />
          </div>

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
          />

          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            rows={4}
            placeholder="OA question description"
            className="w-full px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
          />

          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            rows={4}
            placeholder="Your solution / approach (optional)"
            className="w-full px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className={`px-6 py-3 rounded-lg text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Publishing..." : "Publish Discussion"}
          </motion.button>
        </form>
      </div>
    </PageWrapper>
  );
}
