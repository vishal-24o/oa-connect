import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <PageWrapper>
      {/* HERO */}
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
            Built for students preparing smarter
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white">
            Discuss Online Assessments <br />
            Smarter & Faster
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            OAConnect is a student-driven platform to discuss OA questions,
            solutions, and company-wise assessment experiences.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/discussions"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Explore Discussions
            </Link>

            <Link
              to="/post"
              className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Post a Discussion
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            How It Works
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-blue-600 text-3xl font-bold">1</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                Sign Up
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Join the community and get started in seconds.
              </p>
            </div>

            <div>
              <div className="text-blue-600 text-3xl font-bold">2</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                Post or Search OAs
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Explore company-wise OA questions or share your own.
              </p>
            </div>

            <div>
              <div className="text-blue-600 text-3xl font-bold">3</div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                Discuss & Learn
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Learn multiple approaches from peers and improve faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / CTA (INTENTIONALLY BLUE – NO DARK MODE) */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Ready to crack your next OA?
          </h2>

          <p className="mt-4 text-blue-100">
            Join a growing community of students preparing smarter together.
          </p>

          <div className="mt-10">
            <Link
              to="/post"
              className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
            >
              Get Started Free
            </Link>
          </div>
        </div>
        
      </section>
    </PageWrapper>
  );
}
