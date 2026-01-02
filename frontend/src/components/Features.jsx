import { motion } from "framer-motion";

const features = [
  {
    title: "Company-wise Discussions",
    desc: "Explore real OA questions and discussions from top companies based on actual student experiences.",
  },
  {
    title: "Peer-reviewed Solutions",
    desc: "Understand multiple solution approaches explained clearly by fellow students.",
  },
  {
    title: "Search & Filters",
    desc: "Quickly filter discussions by company, role, tags, or difficulty level.",
  },
];

export default function Features() {
  return (
    <section className="bg-slate-50 dark:bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white text-center"
        >
          Why OAConnect?
        </motion.h2>

        {/* Feature Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="
                bg-white dark:bg-slate-800
                p-8 rounded-2xl
                border border-slate-200 dark:border-slate-700
                hover:-translate-y-1 hover:shadow-xl
                transition
              "
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
