import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { getCurrentUserId } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL;

export default function DiscussionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUserId = getCurrentUserId();

  /* =========================
     FETCH SINGLE DISCUSSION
     ========================= */
  useEffect(() => {
    async function fetchDiscussion() {
      try {
        const res = await fetch(`${API_URL}/api/discussions/${id}`);

        if (!res.ok) {
          throw new Error("Discussion not found");
        }

        const data = await res.json();
        setDiscussion(data);
      } catch (err) {
        setError(err.message || "Failed to load discussion");
      } finally {
        setLoading(false);
      }
    }

    fetchDiscussion();
  }, [id]);

  /* =========================
     LOADING / ERROR STATES
     ========================= */
  if (loading) {
    return (
      <PageWrapper>
        <div className="text-center py-32 text-slate-500">
          Loading discussion...
        </div>
      </PageWrapper>
    );
  }

  if (error || !discussion) {
    return (
      <PageWrapper>
        <div className="text-center py-32">
          <p className="text-lg text-red-500">
            {error || "Discussion not found"}
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

  /* =========================
     OWNER CHECK
     ========================= */
  const isOwner = discussion.authorId === currentUserId;

  /* =========================
     DELETE HANDLER
     ========================= */
  async function handleDelete() {
    if (!window.confirm("Delete your discussion?")) return;

    try {
      const res = await fetch(
        `${API_URL}/api/discussions/${discussion._id}`,
        {
          method: "DELETE",
          headers: {
            "x-user-id": currentUserId,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Not authorized or delete failed");
      }

      navigate("/discussions");
    } catch (err) {
      alert("Failed to delete discussion");
    }
  }

  /* =========================
     UI
     ========================= */
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-6 py-28">
        <Link
          to="/discussions"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to discussions
        </Link>

        <h1 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">
          {discussion.title}
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {discussion.company} · {discussion.role}
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <span className="px-3 py-1 rounded-full text-sm bg-slate-100 dark:bg-slate-700">
            {discussion.difficulty}
          </span>

          {discussion.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">OA Question</h2>
          <p className="mt-3 leading-relaxed">{discussion.question}</p>
        </div>

        {discussion.solution && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Solution</h2>
            <p className="mt-3 leading-relaxed">{discussion.solution}</p>
          </div>
        )}

        {/* DELETE — OWNER ONLY */}
        {isOwner && (
          <button
            onClick={handleDelete}
            className="mt-10 text-sm text-red-600 hover:underline"
          >
            Delete your discussion
          </button>
        )}
      </div>
    </PageWrapper>
  );
}
