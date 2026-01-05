const API_URL =
  import.meta.env.VITE_API_URL || "https://oa-connect.onrender.com";

function getAuthHeader() {
  const token = localStorage.getItem("auth_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* =========================
   GET ALL DISCUSSIONS
   ========================= */
export async function fetchDiscussions() {
  const res = await fetch(`${API_URL}/api/discussions`);
  if (!res.ok) throw new Error("Failed to fetch discussions");
  return res.json();
}

/* =========================
   GET DISCUSSION BY ID
   ========================= */
export async function fetchDiscussionById(id) {
  const res = await fetch(`${API_URL}/api/discussions/${id}`);
  if (!res.ok) throw new Error("Discussion not found");
  return res.json();
}

/* =========================
   CREATE DISCUSSION (JWT)
   ========================= */
export async function createDiscussion(data) {
  const res = await fetch(`${API_URL}/api/discussions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create discussion");
  return res.json();
}

/* =========================
   DELETE DISCUSSION (JWT)
   ========================= */
export async function deleteDiscussion(id) {
  const res = await fetch(`${API_URL}/api/discussions/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Delete failed");
  }

  return res.json();
}
