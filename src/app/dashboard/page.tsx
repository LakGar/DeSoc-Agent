"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface UserProfile {
  id: string;
  walletAddress: string;
  agentName: string;
  interestAreas: string[];
}

export default function Dashboard() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not connected
    if (!isConnected) {
      router.push("/login");
      return;
    }

    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `/api/user/profile?walletAddress=${address}`
        );
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Handle error
          router.push("/onboarding");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [address, isConnected, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">
            Loading your DeSoc Agent dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        {user && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Welcome, {user.agentName}
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Your AI agent is actively managing your Web3 presence
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg px-4 py-2 border border-white/10">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">AI Agent Active</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Activity Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {/* Recent Activity Card */}
              <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6 md:col-span-2">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">
                        Voted on Uniswap Governance Proposal
                      </p>
                      <p className="text-sm text-gray-400">
                        GIP-23: Fee Structure Update
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-purple-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Posted on Optimism Forum</p>
                      <p className="text-sm text-gray-400">
                        Response to "L2 Scaling Solutions Comparison"
                      </p>
                      <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Tracked Reputation Growth</p>
                      <p className="text-sm text-gray-400">
                        +5% increase in DeFi credibility score
                      </p>
                      <p className="text-xs text-gray-500 mt-1">12 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h2 className="text-xl font-bold mb-4">Agent Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-gray-400">Governance Votes</span>
                    <span className="font-medium">14</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-gray-400">Forum Posts</span>
                    <span className="font-medium">27</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-gray-400">Reputation Score</span>
                    <span className="font-medium">78/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active DAOs</span>
                    <span className="font-medium">4</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upcoming Tasks</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="flex-grow">
                    <p className="font-medium">Compound Governance Vote</p>
                    <p className="text-sm text-gray-400">
                      Proposal to adjust interest rates
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">In 2 days</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="flex-grow">
                    <p className="font-medium">Monitor Uniswap Position</p>
                    <p className="text-sm text-gray-400">
                      Check impermanent loss and rebalance if needed
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">Daily</div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="flex-grow">
                    <p className="font-medium">ENS Domain Renewal</p>
                    <p className="text-sm text-gray-400">
                      Your ENS domain expires soon
                    </p>
                  </div>
                  <div className="text-sm text-gray-400">In 7 days</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
