"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName } from "wagmi";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setLoading(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
      <motion.h1
        className="text-5xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to DeSoc Agent
      </motion.h1>
      <p className="text-lg text-gray-300 mt-4">
        Your AI-powered Web3 Identity Manager
      </p>

      <div className="mt-6">
        <ConnectButton />
      </div>

      {isConnected && (
        <motion.div
          className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-400">Logged in as:</p>
          <p className="font-bold">{ensName || address}</p>
        </motion.div>
      )}

      {loading && (
        <motion.div
          className="mt-4 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Redirecting to Dashboard...
        </motion.div>
      )}
    </div>
  );
}
