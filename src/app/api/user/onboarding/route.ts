import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Define validation schema for API
const userSchema = z.object({
  walletAddress: z.string(),
  email: z.string().email().optional(),
  agentName: z.string().min(3),
  ensName: z.string().optional(),
  interestAreas: z.array(z.string()),
  preferredDAOs: z.array(z.string()),
  votingStrategy: z.string(),
  delegateVoting: z.boolean(),
  skillsExpertise: z.array(z.string()),
  autoMonetization: z.boolean(),
  zkmlPrivacyPreference: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate the request body
    const validatedData = userSchema.parse(body);

    // Create empty JSON objects for complex data
    const pastContributions = {};
    const onChainActivity = {};
    const smartContractPermissions = {};

    // Create or update user data
    const user = await prisma.deSocUser.upsert({
      where: {
        walletAddress: validatedData.walletAddress,
      },
      update: {
        email: validatedData.email,
        ensName: validatedData.ensName,
        agentName: validatedData.agentName,
        interestAreas: validatedData.interestAreas,
        preferredDAOs: validatedData.preferredDAOs,
        votingStrategy: validatedData.votingStrategy,
        delegateVoting: validatedData.delegateVoting,
        skillsExpertise: validatedData.skillsExpertise,
        autoMonetization: validatedData.autoMonetization,
        zkmlPrivacyPreference: validatedData.zkmlPrivacyPreference,
        hasCompletedOnboarding: true,
        pastContributions: pastContributions,
        onChainActivity: onChainActivity,
        smartContractPermissions: smartContractPermissions,
      },
      create: {
        walletAddress: validatedData.walletAddress,
        email: validatedData.email,
        ensName: validatedData.ensName,
        agentName: validatedData.agentName,
        interestAreas: validatedData.interestAreas,
        preferredDAOs: validatedData.preferredDAOs,
        votingStrategy: validatedData.votingStrategy,
        delegateVoting: validatedData.delegateVoting,
        skillsExpertise: validatedData.skillsExpertise,
        autoMonetization: validatedData.autoMonetization,
        zkmlPrivacyPreference: validatedData.zkmlPrivacyPreference,
        hasCompletedOnboarding: true,
        pastContributions: pastContributions,
        onChainActivity: onChainActivity,
        smartContractPermissions: smartContractPermissions,
      },
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          walletAddress: user.walletAddress,
          agentName: user.agentName,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in user onboarding:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create user profile",
      },
      { status: 500 }
    );
  }
}
