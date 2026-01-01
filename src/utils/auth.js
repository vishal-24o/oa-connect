export const ADMIN_USER_ID = "oa-connect-admin";

export function getCurrentUserId() {
  let userId = localStorage.getItem("user_id");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("user_id", userId);
  }

  return userId;
}
