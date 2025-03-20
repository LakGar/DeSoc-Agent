"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden font-sans">
      {/* Grid Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-50"></div>
      </div>

      {/* Small polygon decorations */}
      <div className="absolute top-[20%] left-[20%] w-8 h-8 bg-white/5 rotate-45"></div>
      <div className="absolute bottom-[20%] right-[30%] w-12 h-12 border border-white/10 rounded-lg rotate-12"></div>
      <div className="absolute top-[40%] right-[20%] w-6 h-6 border border-white/10 rounded-full"></div>

      <div className="z-10 max-w-6xl mx-auto px-4 py-20 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-6 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
              <span className="text-blue-400 font-medium tracking-wide text-sm">
                Web3 Identity Management
              </span>
            </div>

            <h1 className="text-title font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 tracking-tight leading-tighter">
              Welcome to DeSoc Agent
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed tracking-tight font-light">
              Your AI-powered Web3 Identity Manager for secure and seamless
              digital identity verification and management.
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
                    className="w-full inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-glow hover:shadow-blue-900/40"
                  >
                    Get Started
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Link
                    href="#"
                    className="w-full inline-block bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-xl font-semibold transition-all hover:bg-white/10"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="tracking-wide text-sm">
                    Verified Identity
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="tracking-wide text-sm">
                    Secure & Private
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero Image/Visual Section */}
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
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  ></path>
                </svg>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">ID</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 tracking-wide">
                      Verified Identity
                    </div>
                    <div className="font-medium text-white tracking-tight">
                      0x7F...4e2A
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">DA</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 tracking-wide">
                      Agent Status
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">Active</span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-2xs font-medium tracking-wider rounded-full">
                        Secured
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-sm text-gray-400 tracking-wide">
                      Connections
                    </div>
                    <div className="text-xl font-medium text-white">24</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-sm text-gray-400 tracking-wide">
                      Credentials
                    </div>
                    <div className="text-xl font-medium text-white">7</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Background decorations for the card */}
            <div className="absolute -top-8 -left-8 w-full h-full bg-blue-500/5 rounded-2xl transform -rotate-3"></div>
            <div className="absolute -bottom-8 -right-8 w-full h-full bg-purple-500/5 rounded-2xl transform rotate-3"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
