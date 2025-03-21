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
        hasCompletedOnboarding: true,
      },
    });

    if (!user) {
      // User doesn't exist
      return NextResponse.json(
        {
          exists: false,
          hasCompletedOnboarding: false,
        },
        { status: 200 }
      );
    }

    // Return user status
    return NextResponse.json(
      {
        exists: true,
        hasCompletedOnboarding: user.hasCompletedOnboarding,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      {
        error: "Failed to check user profile",
      },
      { status: 500 }
    );
  }
}
