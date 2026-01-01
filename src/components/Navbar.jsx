import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  // ✅ Default dark mode
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored ? stored === "dark" : true;
  });

  // ✅ Apply theme on load & change
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            OAConnect
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Student OA Community
          </p>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/discussions"
            className={({ isActive }) =>
              `text-sm ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-700 dark:text-slate-300"
              }`
            }
          >
            Discussions
          </NavLink>

          <NavLink
            to="/post"
            className="text-sm text-slate-700 dark:text-slate-300"
          >
            Post
          </NavLink>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-sm"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* CTA */}
          <Link
            to="/post"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
