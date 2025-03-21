import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Get wallet address from query parameter
    const walletAddress = req.nextUrl.searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        {
          error: "Wallet address is required",
        },
        { status: 400 }
      );
    }

    // Find user by wallet address
    const user = await prisma.deSocUser.findUnique({
      where: {
        walletAddress: walletAddress,
      },
      select: {
        id: true,
        walletAddress: true,
        agentName: true,
        email: true,
        ensName: true,
        interestAreas: true,
        profilePicture: true,
        preferredDAOs: true,
        votingStrategy: true,
        delegateVoting: true,
        zkmlReputationScore: true,
        skillsExpertise: true,
        autoMonetization: true,
        zkmlPrivacyPreference: true,
        hasCompletedOnboarding: true,
      },
    });

    if (!user) {
      // User doesn't exist
      return NextResponse.json(
        {
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Return user data
    return NextResponse.json(
      {
        success: true,
        user: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch user profile",
      },
      { status: 500 }
    );
  }
}
