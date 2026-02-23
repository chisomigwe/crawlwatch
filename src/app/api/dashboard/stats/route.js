import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  getUserSites,
  getAgentVisitStats,
  getLatestVisibilityScore,
  getCitationCount,
} from "@/lib/supabase";

// GET /api/dashboard/stats — aggregate dashboard stats for user's sites
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const sites = await getUserSites(userId);

    if (!sites.length) {
      return NextResponse.json({
        totalVisits: 0,
        visibilityScore: null,
        citations: 0,
        uniqueAgents: 0,
        agents: [],
        topPages: [],
        sites: [],
      });
    }

    // Aggregate stats across all sites
    let totalVisits = 0;
    let allAgents = [];
    let allTopPages = [];
    let totalCitations = 0;
    const uniqueAgentSet = new Set();

    for (const site of sites) {
      const stats = await getAgentVisitStats(site.id, 24);
      totalVisits += stats.total;
      allAgents.push(...stats.agents);
      allTopPages.push(...stats.topPages);

      for (const agent of stats.agents) {
        uniqueAgentSet.add(agent.name);
      }

      const citations = await getCitationCount(site.id, 7);
      totalCitations += citations;
    }

    // Get visibility score from the first site
    const visibilityScore = sites[0]
      ? await getLatestVisibilityScore(sites[0].id)
      : null;

    // Deduplicate and sort agents
    const agentMap = {};
    for (const agent of allAgents) {
      if (!agentMap[agent.name]) {
        agentMap[agent.name] = { ...agent };
      } else {
        agentMap[agent.name].visits += agent.visits;
        agentMap[agent.name].pages += agent.pages;
      }
    }

    return NextResponse.json({
      totalVisits,
      visibilityScore: visibilityScore?.overall_score || null,
      platformScores: visibilityScore?.platform_scores || {},
      citations: totalCitations,
      uniqueAgents: uniqueAgentSet.size,
      agents: Object.values(agentMap).sort((a, b) => b.visits - a.visits),
      topPages: allTopPages.sort((a, b) => b.visits - a.visits).slice(0, 10),
      sites,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
