const API_URL = import.meta.env.VITE_API_URL;

export async function fetchDiscussions() {
  const res = await fetch(`${API_URL}/api/discussions`);
  if (!res.ok) throw new Error("Failed to fetch discussions");
  return res.json();
}

export async function createDiscussion(data) {
  const res = await fetch(`${API_URL}/api/discussions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create discussion");
  return res.json();
}

export async function fetchDiscussionById(id) {
  const res = await fetch(`${API_URL}/api/discussions/${id}`);

  if (!res.ok) {
    throw new Error("Discussion not found");
  }

  return res.json();
}
