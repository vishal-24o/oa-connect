import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { fetchDiscussionById, deleteDiscussion } from "../api/discussions";
import { useAuth } from "../context/AuthContext";

export default function DiscussionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchDiscussionById(id);
        setDiscussion(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

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
          <Link to="/discussions" className="text-blue-600 hover:underline">
            ← Back to discussions
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const isOwner = user && discussion.authorId === user.id;

  async function handleDelete() {
    if (!window.confirm("Delete your discussion?")) return;

    try {
      await deleteDiscussion(discussion._id);
      navigate("/discussions");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-6 py-28">
        <Link to="/discussions" className="text-sm text-blue-600 hover:underline">
          ← Back to discussions
        </Link>

        <h1 className="mt-4 text-3xl font-semibold">
          {discussion.title}
        </h1>

        <p className="mt-2 text-slate-600">
          {discussion.company} · {discussion.role}
        </p>

        <div className="mt-4 flex gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-slate-200 text-sm">
            {discussion.difficulty}
          </span>
          {discussion.tags?.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-blue-200 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">OA Question</h2>
          <p className="mt-3">{discussion.question}</p>
        </div>

        {discussion.solution && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Solution</h2>
            <p className="mt-3">{discussion.solution}</p>
          </div>
        )}

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
