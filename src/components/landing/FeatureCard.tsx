"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureProps {
  feature: {
    icon: ReactNode;
    title: string;
    description: string;
    gradient: string;
  };
  index: number;
}

export function FeatureCard({ feature, index }: FeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-black/30 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:shadow-lg hover:border-white/20 transition-all duration-300"
    >
      <div
        className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white shadow-glow-sm`}
      >
        {feature.icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>

      <p className="text-gray-400">{feature.description}</p>

      <div className="mt-6 pt-4 border-t border-white/10">
        <motion.div
          whileHover={{ x: 4 }}
          className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          Learn more
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
