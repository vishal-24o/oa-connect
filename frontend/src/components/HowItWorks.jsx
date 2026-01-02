import { motion } from "framer-motion";

const steps = [
  {
    icon: "👤",
    title: "Sign Up",
    desc: "Create your account and join the OAConnect community.",
  },
  {
    icon: "🔍",
    title: "Post or Search OAs",
    desc: "Share OA questions or explore discussions by company and role.",
  },
  {
    icon: "💬",
    title: "Discuss & Learn",
    desc: "Engage with peers, compare solutions, and learn smarter.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white"
        >
          How It Works
        </motion.h2>

        <p className="mt-4 text-slate-600 dark:text-slate-400">
          A simple flow designed to help you prepare better for OAs
        </p>

        {/* Steps */}
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl shadow">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
