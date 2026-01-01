import { useParams, Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { getDiscussions, deleteDiscussion } from "../utils/storage";
import { getCurrentUserId } from "../utils/auth";

export default function DiscussionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const discussions = getDiscussions();
  const discussion = discussions.find(
    (d) => d.id === Number(id)
  );

  if (!discussion) {
    return (
      <PageWrapper>
        <div className="max-w-3xl mx-auto px-6 py-28 text-center">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Discussion not found.
          </p>
          <Link
            to="/discussions"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Back to discussions
          </Link>
        </div>
      </PageWrapper>
    );
  }

  /* ✅ STEP 3 — OWNERSHIP CHECK */
  const currentUserId = getCurrentUserId();
  const isOwner = discussion.authorId === currentUserId;

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-6 py-28">
        {/* Back */}
        <Link
          to="/discussions"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to discussions
        </Link>

        {/* Title */}
        <h1 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
          {discussion.title}
        </h1>

        {/* Meta */}
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {discussion.company} · {discussion.role}
        </p>

        {/* Difficulty + Tags */}
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="px-3 py-1 rounded-full text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            {discussion.difficulty}
          </span>

          {discussion.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Question */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            OA Question
          </h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
            {discussion.question}
          </p>
        </div>

        {/* Solution */}
        {discussion.solution && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Solution / Approach
            </h2>
            <p className="mt-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              {discussion.solution}
            </p>
          </div>
        )}

        {/* ✅ STEP 4 — DELETE ONLY FOR OWNER */}
        {isOwner && (
          <button
            onClick={() => {
              if (window.confirm("Delete your discussion?")) {
                deleteDiscussion(discussion.id);
                navigate("/discussions");
              }
            }}
            className="mt-10 text-sm text-red-600 hover:underline"
          >
            Delete your discussion
          </button>
        )}
      </div>
    </PageWrapper>
  );
}
