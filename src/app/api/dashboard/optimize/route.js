import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserSites, getPageScores } from "@/lib/supabase";

// GET /api/dashboard/optimize — get page optimization scores
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sites = await getUserSites(userId);
    if (!sites.length) {
      return NextResponse.json({ pages: [], site: null });
    }

    const siteId = sites[0].id;
    const pages = await getPageScores(siteId);

    return NextResponse.json({ pages, site: sites[0] });
  } catch (error) {
    console.error("Error fetching page scores:", error);
    return NextResponse.json({ error: "Failed to fetch page scores" }, { status: 500 });
  }
}
