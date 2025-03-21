"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <div
      className="min-h-[calc(100vh-5rem)] grid md:grid-cols-2 gap-12 items-center py-16 md:py-24"
      id="home"
    >
      <motion.div
        className="text-center md:text-left"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo Section */}
        <motion.div
          className="mb-8 flex justify-center md:justify-start"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative h-24 w-24 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl rotate-12 opacity-80"></div>
            <div className="relative z-10 bg-gradient-to-br from-blue-600 to-purple-700 h-20 w-20 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold tracking-tight">
                AGENTX
              </span>
            </div>
            <div className=" z-10 absolute -right-2 -bottom-2 bg-gradient-to-br from-green-400 to-blue-500 h-10 w-10 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-xs font-bold ">AI</span>
            </div>
          </div>
        </motion.div>

        <div className="inline-block mb-6 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
          <span className="text-blue-400 font-medium tracking-wide text-sm">
            AI-powered Web3 Agent
          </span>
        </div>

        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 tracking-tight leading-tighter">
          Your AI Delegate in <br />
          the Web3 World
        </h1>

        <p className="text-xl text-gray-300 mb-8 leading-relaxed tracking-tight font-light">
          DeSoc Agent is your AI-powered representative in the decentralized
          web, managing your identity, reputation, and digital activities.
        </p>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link
                href="/login"
                className="w-full inline-block bg-white text-black px-8 py-4 rounded-xl font-semibold transition-all shadow-glow hover:shadow-blue-900/40"
              >
                Deploy Your Agent
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link
                href="#features"
                className="w-full inline-block bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-xl font-semibold transition-all hover:bg-white/10"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              Decentralized
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              Privacy-focused
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              Self-sovereign
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="relative z-10 bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl">
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transform rotate-12">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>

          <div className="flex items-center mb-6">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Agent Demo</h3>
              <p className="text-xs text-gray-400">See how it works</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/40 rounded-lg p-4 border border-white/5">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-400">Active Task</span>
              </div>
              <p className="text-sm text-white">
                Voting on governance proposal GIP-23 (Uniswap V4 Upgrade)
              </p>
              <div className="mt-2 h-2 bg-black/30 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border border-white/5">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs text-gray-400">
                  Reputation Management
                </span>
              </div>
              <p className="text-sm text-white">
                Generated and posted technical content on Optimism forum
              </p>
              <div className="flex items-center mt-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-800 border border-black flex items-center justify-center text-[10px] text-white">
                    OP
                  </div>
                  <div className="w-6 h-6 rounded-full bg-gray-800 border border-black flex items-center justify-center text-[10px] text-white">
                    GM
                  </div>
                </div>
                <span className="text-xs text-gray-400 ml-2">2 reactions</span>
              </div>
            </div>

            <div className="bg-black/40 rounded-lg p-4 border border-white/5">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-xs text-gray-400">Monitoring</span>
              </div>
              <p className="text-sm text-white">
                Tracking gas prices for optimal transaction timing
              </p>
              <div className="mt-2 flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  ></path>
                </svg>
                <span className="text-xs text-green-500">18.4 gwei</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-blue-500/10 to-transparent"></div>
        <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      </motion.div>
    </div>
  );
}
