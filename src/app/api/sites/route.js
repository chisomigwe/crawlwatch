import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserSites, createSite, getUserByClerkId, syncUserToSupabase } from "@/lib/supabase";

// GET /api/sites — list user's sites
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sites = await getUserSites(userId);
    return NextResponse.json({ sites });
  } catch (error) {
    console.error("Error listing sites:", error);
    return NextResponse.json({ error: "Failed to list sites" }, { status: 500 });
  }
}

// POST /api/sites — add a new site to track
export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { domain, name } = await request.json();
    if (!domain) return NextResponse.json({ error: "Domain is required" }, { status: 400 });

    // Ensure user exists
    let user = await getUserByClerkId(userId);
    if (!user) {
      user = await syncUserToSupabase(userId, "");
    }

    const site = await createSite(user.id, domain, name);
    return NextResponse.json({ site });
  } catch (error) {
    console.error("Error creating site:", error);
    return NextResponse.json({ error: "Failed to create site" }, { status: 500 });
  }
}
