"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName } from "wagmi";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Import Shadcn UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  remember: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize form with Shadcn Form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // Form submission handler
  function onSubmit(values: LoginFormValues) {
    console.log("Form values:", values);
    setFormSubmitted(true);
    setLoading(true);

    // Fake login delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  }

  // Check if user has completed onboarding after connecting wallet
  useEffect(() => {
    const checkUserOnboarding = async () => {
      if (address && isConnected) {
        try {
          // Check if user profile exists and has completed onboarding
          const response = await fetch(
            `/api/user/check?walletAddress=${address}`
          );
          const data = await response.json();

          if (response.ok) {
            if (data.exists && data.hasCompletedOnboarding) {
              // User exists and has completed onboarding, redirect to dashboard
              router.push("/dashboard");
            } else {
              // User needs to complete onboarding
              router.push("/onboarding");
            }
          }
        } catch (error) {
          console.error("Error checking user onboarding status:", error);
        }
      }
    };

    if (isConnected) {
      checkUserOnboarding();
    }
  }, [address, isConnected, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 relative overflow-hidden font-sans">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-70"></div>
      </div>

      {/* Small polygon decorations */}
      <div className="absolute top-[15%] left-[25%] w-8 h-8 bg-white/5 rotate-45"></div>
      <div className="absolute bottom-[30%] right-[20%] w-12 h-12 border border-white/10 rounded-lg rotate-12"></div>
      <div className="absolute top-[40%] right-[15%] w-6 h-6 border border-white/10 rounded-full"></div>

      <div className="w-full max-w-md z-10 relative">
        <motion.div
          className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hexagon Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Outer hexagon with gradient */}
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                className="drop-shadow-lg"
              >
                <defs>
                  <linearGradient
                    id="hexGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <polygon
                  points="40,0 74.6,20 74.6,60 40,80 5.4,60 5.4,20"
                  fill="url(#hexGradient)"
                />
              </svg>

              {/* Inner hexagon for depth */}
              <svg
                width="60"
                height="60"
                viewBox="0 0 80 80"
                className="absolute top-[10px] left-[10px]"
              >
                <polygon
                  points="40,0 74.6,20 74.6,60 40,80 5.4,60 5.4,20"
                  fill="rgba(10,10,10,1)"
                />
              </svg>

              {/* Text in the middle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xl font-bold tracking-tight"></span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-300 font-light tracking-wide">
              Log in to your account to continue
            </p>
          </div>

          <div className="space-y-6">
            {/* Email & Password Form */}
            {!formSubmitted && (
              <motion.div
                className="space-y-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-sm text-gray-300 font-medium">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your@email.com"
                              {...field}
                              className="bg-black/30 border-white/10 text-white focus-visible:ring-blue-500/50 focus-visible:ring-offset-0"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-sm text-gray-300 font-medium">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              {...field}
                              className="bg-black/30 border-white/10 text-white focus-visible:ring-blue-500/50 focus-visible:ring-offset-0"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400 text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between items-center">
                      <FormField
                        control={form.control}
                        name="remember"
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="remember"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-white/20 bg-black/30 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
                            />
                            <label
                              htmlFor="remember"
                              className="text-sm text-gray-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Remember me
                            </label>
                          </div>
                        )}
                      />

                      <Link
                        href="#"
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Button type="submit" className="w-full ">
                      Sign In
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}

            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-white/10"></div>
              <p className="text-sm text-gray-400">or connect with wallet</p>
              <div className="h-[1px] flex-1 bg-white/10"></div>
            </div>

            <div className="flex justify-center">
              <ConnectButton />
            </div>

            {isConnected && (
              <motion.div
                className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-5 rounded-xl border border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <p className="text-green-400 text-sm font-medium tracking-wide">
                    Connected Successfully
                  </p>
                </div>
                <div className="mt-3 pl-4 border-l-2 border-white/10">
                  <p className="text-gray-400 text-sm tracking-wide">
                    Connected as:
                  </p>
                  <p className="font-medium text-white truncate tracking-tight">
                    {ensName || address}
                  </p>
                </div>
              </motion.div>
            )}

            {(loading || formSubmitted) && (
              <motion.div
                className="text-center p-4 bg-white/5 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
                <p className="text-gray-300 mt-2 font-light tracking-wide">
                  Redirecting to Dashboard...
                </p>
              </motion.div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-6">
              <Link
                href="/"
                className="flex items-center text-sm text-gray-400 hover:text-white transition-colors tracking-wide"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Back to Home
              </Link>
              <Link
                href="#"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors tracking-wide"
              >
                Need Help?
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Version indicator */}
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>Version 1.0.2 • Last update: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
