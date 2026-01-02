const STORAGE_KEY = "oa_discussions";

export function getDiscussions() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveDiscussions(discussions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(discussions));
}

/* ✅ NEW: delete single discussion */
export function deleteDiscussion(id) {
  const discussions = getDiscussions();
  const updated = discussions.filter((d) => d.id !== id);
  saveDiscussions(updated);
}

/* ✅ NEW: clear all (dev only) */
export function clearDiscussions() {
  localStorage.removeItem(STORAGE_KEY);
}
