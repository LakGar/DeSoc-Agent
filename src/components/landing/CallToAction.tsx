"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CallToAction() {
  return (
    <div className="mt-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-xl border border-white/10 p-8 max-w-3xl mx-auto"
      >
        <h3 className="text-2xl font-bold mb-3 text-white">
          Ready to deploy your AI agent?
        </h3>
        <p className="text-gray-300 mb-6">
          Join the future of Web3 with your personal AI representative in the
          decentralized world.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            href="/login"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-glow hover:shadow-blue-900/40"
          >
            Get Started Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
