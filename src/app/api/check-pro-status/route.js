import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkUserPaymentStatus } from "@/lib/supabase";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const status = await checkUserPaymentStatus(userId);

    return NextResponse.json(status);
  } catch (error) {
    console.error("Error checking pro status:", error);
    return NextResponse.json(
      { error: "Failed to check status" },
      { status: 500 }
    );
  }
}
