"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define form schema
const formSchema = z.object({
  // Basic Identity
  email: z.string().email().optional(),
  agentName: z.string().min(3, {
    message: "Agent name must be at least 3 characters.",
  }),
  ensName: z.string().optional(),

  // Interest Areas (at least one required)
  interestAreas: z.array(z.string()).min(1, {
    message: "Select at least one interest area.",
  }),

  // Governance
  preferredDAOs: z.array(z.string()),
  votingStrategy: z.string(),
  delegateVoting: z.boolean().default(false),

  // Monetization
  skillsExpertise: z.array(z.string()),
  autoMonetization: z.boolean().default(false),

  // Privacy
  zkmlPrivacyPreference: z.string(),
});

// Common DAOs for selection
const commonDAOs = [
  { id: "uniswap", name: "Uniswap" },
  { id: "aave", name: "Aave" },
  { id: "maker", name: "MakerDAO" },
  { id: "ens", name: "ENS DAO" },
  { id: "optimism", name: "Optimism" },
  { id: "arbitrum", name: "Arbitrum" },
  { id: "gitcoin", name: "Gitcoin" },
  { id: "compound", name: "Compound" },
];

// Web3 interest areas
const interestAreas = [
  { id: "defi", name: "DeFi" },
  { id: "nfts", name: "NFTs & Digital Art" },
  { id: "dao", name: "DAO Governance" },
  { id: "social", name: "Social Web3" },
  { id: "gaming", name: "Web3 Gaming" },
  { id: "identity", name: "Digital Identity" },
  { id: "metaverse", name: "Metaverse" },
  { id: "security", name: "Web3 Security" },
];

// Skills and expertise
const skillOptions = [
  { id: "development", name: "Smart Contract Development" },
  { id: "design", name: "Web3 UI/UX Design" },
  { id: "research", name: "Blockchain Research" },
  { id: "community", name: "Community Management" },
  { id: "content", name: "Content Creation" },
  { id: "governance", name: "Governance Strategy" },
  { id: "tokenomics", name: "Tokenomics" },
  { id: "legal", name: "Crypto Legal/Regulatory" },
];

// Steps for onboarding process
const steps = [
  { id: "identity", title: "Identity" },
  { id: "governance", title: "Governance" },
  { id: "monetization", title: "Monetization & Privacy" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { address } = useAccount();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for backward, 1 for forward
  const [submitting, setSubmitting] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentName: "",
      email: "",
      ensName: "",
      interestAreas: [],
      preferredDAOs: [],
      votingStrategy: "community",
      delegateVoting: false,
      skillsExpertise: [],
      autoMonetization: false,
      zkmlPrivacyPreference: "medium",
    },
  });

  // Get current step ID
  const currentStepId = steps[currentStep].id;

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!address) {
      return;
    }

    setSubmitting(true);

    try {
      // Add wallet address to form data
      const userData = {
        ...values,
        walletAddress: address,
      };

      // Submit to API
      const response = await fetch("/api/user/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user profile");
      }

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating user profile:", error);
    } finally {
      setSubmitting(false);
    }
  }

  // Navigation handlers
  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  };

  // Check if the user is connected
  if (!address) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white p-4">
        <div className="bg-black/30 backdrop-blur-md rounded-xl p-8 border border-white/10 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Wallet Not Connected
          </h2>
          <p className="text-gray-300 mb-6 text-center">
            Please connect your wallet to set up your DeSoc Agent profile.
          </p>
          <Button className="w-full" onClick={() => router.push("/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden min-h-screen max-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white p-4 sm:p-6 md:p-8 relative ">
      {/* Logo and header */}
      <div className="absolute top-6 left-6 flex items-center z-10">
        <span className="text-white text-lg font-bold tracking-tight uppercase space-x-2">
          AGENTX
        </span>
      </div>

      <div className="max-w-4xl mx-auto w-full pt-5 ">
        {/* Progress indicator */}
        <div className=" w-full">
          <div className="flex justify-between mb-2 overflow-hidden">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <span
                  className={`text-sm mt-2 ${
                    currentStep >= index ? "text-white" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden my-2">
            <div
              className="absolute h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Title for current step */}
        <motion.h2
          key={`title-${currentStepId}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold my-6 text-left"
        >
          {currentStep === 0 && "Tell us about yourself"}
          {currentStep === 1 &&
            "How would you like to participate in governance?"}
          {currentStep === 2 && "Set your monetization & privacy preferences"}
        </motion.h2>

        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="relative">
                <AnimatePresence mode="wait" custom={direction}>
                  {/* Identity Step */}
                  {currentStep === 0 && (
                    <motion.div
                      key="identity-step"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="space-y-6"
                    >
                      <Card className="overflow-auto">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="agentName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>AI Agent Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g., CryptoDelegate"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription className="text-gray-400">
                                    Choose a name for your AI agent that will
                                    represent you.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="your@email.com"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription className="text-gray-400">
                                    Used for notifications and recovery only.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="interestAreas"
                              render={() => (
                                <FormItem>
                                  <div className="mb-4">
                                    <FormLabel>Web3 Interest Areas</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Select areas where your AI agent should
                                      focus.
                                    </FormDescription>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {interestAreas.map((interest) => (
                                      <FormField
                                        key={interest.id}
                                        control={form.control}
                                        name="interestAreas"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={interest.id}
                                              className="flex items-center space-x-3 space-y-0 rounded-md border border-white/10 p-3 hover:bg-white/5 transition-colors"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(
                                                    interest.id
                                                  )}
                                                  onCheckedChange={(
                                                    checked
                                                  ) => {
                                                    return checked
                                                      ? field.onChange([
                                                          ...field.value,
                                                          interest.id,
                                                        ])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) =>
                                                              value !==
                                                              interest.id
                                                          )
                                                        );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormLabel className="text-sm font-medium cursor-pointer flex-grow">
                                                {interest.name}
                                              </FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Governance Step */}
                  {currentStep === 1 && (
                    <motion.div
                      key="governance-step"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="space-y-6"
                    >
                      <Card className="border-white/10 bg-black/50">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="preferredDAOs"
                              render={() => (
                                <FormItem>
                                  <div className="mb-4">
                                    <FormLabel>Preferred DAOs</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Select DAOs your agent should actively
                                      participate in.
                                    </FormDescription>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {commonDAOs.map((dao) => (
                                      <FormField
                                        key={dao.id}
                                        control={form.control}
                                        name="preferredDAOs"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={dao.id}
                                              className="flex items-center space-x-3 space-y-0 rounded-md border border-white/10 p-3 hover:bg-white/5 transition-colors"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(
                                                    dao.id
                                                  )}
                                                  onCheckedChange={(
                                                    checked
                                                  ) => {
                                                    return checked
                                                      ? field.onChange([
                                                          ...field.value,
                                                          dao.id,
                                                        ])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) =>
                                                              value !== dao.id
                                                          )
                                                        );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormLabel className="text-sm font-medium cursor-pointer flex-grow">
                                                {dao.name}
                                              </FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="votingStrategy"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Voting Strategy</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a voting strategy" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="profit">
                                        Profit-focused
                                      </SelectItem>
                                      <SelectItem value="community">
                                        Community-focused
                                      </SelectItem>
                                      <SelectItem value="eco">
                                        Eco-friendly
                                      </SelectItem>
                                      <SelectItem value="security">
                                        Security-focused
                                      </SelectItem>
                                      <SelectItem value="innovation">
                                        Innovation-focused
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription className="text-gray-400">
                                    This guides how your agent votes in
                                    governance proposals.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="delegateVoting"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/10 p-4 hover:bg-white/5 transition-colors">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="cursor-pointer">
                                      Delegate Voting
                                    </FormLabel>
                                    <FormDescription className="text-gray-400">
                                      When inactive, your agent can delegate
                                      your votes to aligned members.
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Monetization & Privacy Step */}
                  {currentStep === 2 && (
                    <motion.div
                      key="monetization-step"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="space-y-6"
                    >
                      <Card className="border-white/10 bg-black/50">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="skillsExpertise"
                              render={() => (
                                <FormItem>
                                  <div className="mb-4">
                                    <FormLabel>Skills & Expertise</FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Select your areas of expertise for
                                      monetization opportunities.
                                    </FormDescription>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {skillOptions.map((skill) => (
                                      <FormField
                                        key={skill.id}
                                        control={form.control}
                                        name="skillsExpertise"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={skill.id}
                                              className="flex items-center space-x-3 space-y-0 rounded-md border border-white/10 p-3 hover:bg-white/5 transition-colors"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(
                                                    skill.id
                                                  )}
                                                  onCheckedChange={(
                                                    checked
                                                  ) => {
                                                    return checked
                                                      ? field.onChange([
                                                          ...field.value,
                                                          skill.id,
                                                        ])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) =>
                                                              value !== skill.id
                                                          )
                                                        );
                                                  }}
                                                />
                                              </FormControl>
                                              <FormLabel className="text-sm font-medium cursor-pointer flex-grow">
                                                {skill.name}
                                              </FormLabel>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    ))}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="autoMonetization"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/10 p-4 hover:bg-white/5 transition-colors">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="cursor-pointer">
                                      Auto-Monetization
                                    </FormLabel>
                                    <FormDescription className="text-gray-400">
                                      Allow your agent to automatically accept
                                      paid opportunities on your behalf.
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="zkmlPrivacyPreference"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Privacy Preference</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select privacy level" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="high">
                                        High Privacy (Limited Data Sharing)
                                      </SelectItem>
                                      <SelectItem value="medium">
                                        Medium Privacy (Balanced)
                                      </SelectItem>
                                      <SelectItem value="low">
                                        Low Privacy (Optimize for Opportunities)
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription className="text-gray-400">
                                    Controls how much information your agent
                                    shares about you.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={goToPreviousStep}
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                <Button
                  type={currentStep === steps.length - 1 ? "submit" : "button"}
                  onClick={
                    currentStep === steps.length - 1 ? undefined : goToNextStep
                  }
                  disabled={submitting}
                  className=""
                >
                  {currentStep === steps.length - 1 ? (
                    submitting ? (
                      "Creating Profile..."
                    ) : (
                      "Create Your Agent"
                    )
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>
            Your data is stored securely and will only be used to train your
            personal AI agent.
          </p>
        </div>
      </div>
    </div>
  );
}
