import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { getDiscussions, saveDiscussions } from "../utils/storage";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDiscussion = {
      id: Date.now(),
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
      createdAt: new Date().toISOString(),
      authorId: getCurrentUserId(), 
    };

    const existing = getDiscussions();
    saveDiscussions([newDiscussion, ...existing]);

    navigate("/discussions");
  };

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-6 py-28">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Post a New Discussion
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Your post is saved locally and visible instantly.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
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
            placeholder="Your solution / approach"
            className="w-full px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Publish Discussion
          </motion.button>
        </form>
      </div>
    </PageWrapper>
  );
}
