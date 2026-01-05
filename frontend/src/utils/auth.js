export const ADMIN_USER_ID = "oa-connect-admin";

const USER_KEY = "oa_user_id";

export function getCurrentUserId() {
  let userId = localStorage.getItem(USER_KEY);

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(USER_KEY, userId);
  }

  return userId;
}
