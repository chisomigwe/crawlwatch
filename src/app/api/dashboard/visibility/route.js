import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserSites, getLatestVisibilityScore, getVisibilityHistory } from "@/lib/supabase";

// GET /api/dashboard/visibility — get visibility scores for user's primary site
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sites = await getUserSites(userId);
    if (!sites.length) {
      return NextResponse.json({
        score: null,
        platformScores: {},
        promptRankings: [],
        history: [],
      });
    }

    const siteId = sites[0].id;
    const [latest, history] = await Promise.all([
      getLatestVisibilityScore(siteId),
      getVisibilityHistory(siteId, 30),
    ]);

    return NextResponse.json({
      score: latest?.overall_score || null,
      platformScores: latest?.platform_scores || {},
      promptRankings: latest?.prompt_rankings || [],
      history,
    });
  } catch (error) {
    console.error("Error fetching visibility:", error);
    return NextResponse.json({ error: "Failed to fetch visibility" }, { status: 500 });
  }
}
