import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    // Alternatively, if you want to use remote patterns:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**', // Allow all hostnames
    //   },
    // ],
  },
};

export default nextConfig;
