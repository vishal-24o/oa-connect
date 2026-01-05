import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : true;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-semibold">OAConnect</h1>
          <p className="text-xs text-slate-500">Student OA Community</p>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <NavLink to="/discussions">Discussions</NavLink>

          {isAuthenticated && (
            <NavLink to="/post">Post</NavLink>
          )}

          {/* Theme toggle */}
          <button onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>

          {/* AUTH UI */}
          {!isAuthenticated ? (
            <Link
              to="/auth"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">
                Hi, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
