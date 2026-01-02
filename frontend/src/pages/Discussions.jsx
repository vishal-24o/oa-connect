import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchDiscussions } from "../api/discussions";
import PageWrapper from "../components/PageWrapper";

/* ✅ Default seeded companies */
const DEFAULT_COMPANIES = [
  "Amazon", "Google", "Microsoft", "Apple", "Meta",
  "Netflix", "Uber", "Airbnb", "LinkedIn", "Adobe",
  "Salesforce", "Oracle", "IBM", "Intel", "NVIDIA",
  "Qualcomm", "Tesla", "Flipkart", "Myntra", "Meesho",
  "Swiggy", "Zomato", "Paytm", "PhonePe", "Razorpay",
  "Stripe", "Atlassian", "Zoho", "Freshworks",
  "Goldman Sachs", "Morgan Stanley", "JPMorgan",
  "DE Shaw", "Tower Research", "Jane Street",
  "Media.net", "Directi", "Walmart", "Expedia",
  "Booking.com"
];

export default function Discussions() {
  const [discussions, setDiscussions] = useState([]); // always array
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [company, setCompany] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDiscussions() {
      try {
        const data = await fetchDiscussions();
        setDiscussions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load discussions", err);
        setDiscussions([]);
      } finally {
        setLoading(false);
      }
    }

    loadDiscussions();
  }, []);


  const safeDiscussions = Array.isArray(discussions) ? discussions : [];

  const normalizedSearch = search.toLowerCase().trim();
  const normalizedDifficulty = difficulty.toLowerCase();
  const normalizedCompany = company.toLowerCase();

  const companiesFromData = safeDiscussions
    .map((d) => d.company?.trim())
    .filter(Boolean);

  const companies = [
    "All",
    ...Array.from(new Set([...DEFAULT_COMPANIES, ...companiesFromData])).sort(),
  ];

  const filteredDiscussions = safeDiscussions.filter((d) => {
    const title = d.title?.toLowerCase() || "";
    const comp = d.company?.toLowerCase() || "";
    const tags = Array.isArray(d.tags) ? d.tags.join(" ").toLowerCase() : "";
    const diff = d.difficulty?.toLowerCase() || "";

    const matchesSearch =
      title.includes(normalizedSearch) ||
      comp.includes(normalizedSearch) ||
      tags.includes(normalizedSearch);

    const matchesDifficulty =
      difficulty === "All" || diff === normalizedDifficulty;

    const matchesCompany =
      company === "All" || comp === normalizedCompany;

    return matchesSearch && matchesDifficulty && matchesCompany;
  });

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-6 py-28">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Discussions
          </h1>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/post"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Post Discussion
            </Link>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, company, or tags..."
            className="md:col-span-2 px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="px-4 py-3 rounded-lg border dark:border-slate-700 bg-white dark:bg-slate-900"
          >
            {companies.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Results */}
        <div className="mt-10">
          {loading ? (
            <p className="text-center text-slate-600 dark:text-slate-400">
              Loading discussions...
            </p>
          ) : filteredDiscussions.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-slate-700 dark:text-slate-300">
                No discussions found
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Try changing filters or be the first to post one.
              </p>

              <Link
                to="/post"
                className="inline-block mt-6 text-blue-600 hover:underline"
              >
                + Post a discussion
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredDiscussions.map((d) => (
                <motion.div
                  key={d._id || d.id}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={`/discussions/${d._id || d.id}`}
                    className="block p-6 border rounded-xl hover:shadow-lg transition dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {d.title}
                    </h2>
                    <p className="mt-1 text-slate-600 dark:text-slate-400">
                      {d.company} · {d.role}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {d.difficulty}
                      </span>

                      {Array.isArray(d.tags) &&
                        d.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
