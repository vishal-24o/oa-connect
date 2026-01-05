import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { requestOtp, verifyOtp } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRequestOtp(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await requestOtp(email, name);
      setStep("otp");
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await verifyOtp(email, otp);

      // ✅ CRITICAL FIX
      login(data.user, data.token);

      navigate("/discussions");
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageWrapper>
      <div className="max-w-md mx-auto py-32 px-6">
        <h1 className="text-2xl font-semibold mb-6">
          {step === "email" ? "Sign in" : "Enter OTP"}
        </h1>

        {error && (
          <p className="mb-4 text-red-500 text-sm">{error}</p>
        )}

        {step === "email" && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />

            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />

            <button
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />

            <button
              disabled={loading}
              className="w-full py-2 bg-green-600 text-white rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </PageWrapper>
  );
}
