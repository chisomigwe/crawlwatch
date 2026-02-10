import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { syncUserToSupabase } from "@/lib/supabase";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    const data = await syncUserToSupabase(userId, email);

    return NextResponse.json({ success: true, user: data });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json(
      { error: "Failed to sync user" },
      { status: 500 }
    );
  }
}
