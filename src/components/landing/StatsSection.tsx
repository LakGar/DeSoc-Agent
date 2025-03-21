"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Stats data
const stats = [
  { value: "24/7", label: "Agent Availability" },
  { value: "90%", label: "Time Saved on DAO Activities" },
  { value: "150+", label: "Web3 Platforms Supported" },
  { value: "3x", label: "Average Growth in Web3 Influence" },
];

// Counter animation for stats
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // For numeric values that end with a suffix
  if (!isNaN(parseFloat(value))) {
    const numericPart = parseFloat(value);
    const suffix = value.replace(numericPart.toString(), "");

    return (
      <span ref={ref} className="text-4xl md:text-5xl font-bold text-white">
        {isInView ? numericPart : 0}
        <span className="text-blue-400">{suffix}</span>
      </span>
    );
  }

  // For non-numeric values like "24/7"
  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {isInView ? value : "0"}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background elements */}
        <div className="absolute -z-10 bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-blue-500/5 to-transparent"></div>

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              DeSoc Agent by the Numbers
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Our AI agents are transforming how people manage their Web3
              presence and activities.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:border-blue-500/30 transition-all duration-300"
            >
              <AnimatedCounter value={stat.value} />
              <p className="mt-2 text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16  bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-xl p-6 md:p-8 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to join 10,000+ Web3 users?
              </h3>
              <p className="text-gray-300">
                Deploy your AI agent and transform your Web3 experience today.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <a
                href="/login"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-glow hover:shadow-blue-900/40 transition-all"
              >
                Deploy Your Agent
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
