"use client";

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "DeSoc Agent",
  projectId: "YOUR_PROJECT_ID", // Replace with your WalletConnect project ID
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#3B82F6", // blue-500
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
