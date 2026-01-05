const API_URL = import.meta.env.VITE_API_URL;

/* =========================
   REQUEST OTP
   ========================= */
export async function requestOtp(email, name) {
  const res = await fetch(`${API_URL}/api/auth/request-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to request OTP");
  }

  return data;
}

/* =========================
   VERIFY OTP
   ========================= */
export async function verifyOtp(email, otp) {
  const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "OTP verification failed");
  }

  return data;
}
