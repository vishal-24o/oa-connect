import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-blue-50 text-blue-600"
        >
          Built for students preparing smarter
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl md:text-6xl font-semibold text-slate-900 dark:text-white"
        >
          Discuss Online Assessments <br /> Smarter & Faster
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-lg text-slate-600 dark:text-slate-400"
        >
          A focused platform where students share OA questions, solutions, and
          company-wise assessment experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex justify-center gap-4"
        >
          <button className="bg-blue-600 text-white px-7 py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
            Join Community
          </button>
          <button
          className="
          px-7 py-3 rounded-lg
          border border-slate-300 dark:border-slate-600
          text-slate-700 dark:text-slate-200
          bg-white dark:bg-slate-900
          hover:bg-slate-100 dark:hover:bg-slate-800
          hover:text-slate-900 dark:hover:text-white
          transition
          "
          >
          Explore Discussions
          </button>

        </motion.div>

      </div>
    </section>
  );
}
