import { NextResponse } from "next/server";
import { getSiteByDomain, recordAgentVisit, getAgentByUserAgent } from "@/lib/supabase";

// POST /api/track — ingest an agent visit event
// This endpoint is called by client integrations (Vercel log drain, Cloudflare worker, etc.)
export async function POST(request) {
  try {
    const body = await request.json();
    const { domain, path, user_agent, ip_address, method, status_code, response_time_ms } = body;

    if (!domain || !path || !user_agent) {
      return NextResponse.json(
        { error: "domain, path, and user_agent are required" },
        { status: 400 }
      );
    }

    // Look up the site
    const site = await getSiteByDomain(domain);
    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    // Identify the agent
    const agent = await getAgentByUserAgent(user_agent);

    // Record the visit
    const visit = await recordAgentVisit({
      site_id: site.id,
      agent_id: agent?.id || null,
      agent_name: agent?.name || parseAgentName(user_agent),
      path,
      method: method || "GET",
      status_code: status_code || 200,
      user_agent,
      ip_address: ip_address || null,
      response_time_ms: response_time_ms || null,
    });

    return NextResponse.json({ success: true, visit_id: visit?.id });
  } catch (error) {
    console.error("Error tracking visit:", error);
    return NextResponse.json({ error: "Failed to track visit" }, { status: 500 });
  }
}

// Extract a readable agent name from user agent string
function parseAgentName(ua) {
  const knownPatterns = [
    "GPTBot", "ChatGPT-User", "OAI-SearchBot",
    "ClaudeBot", "PerplexityBot", "Google-Extended",
    "Googlebot", "Bytespider", "CCBot", "Applebot",
    "cohere-ai", "Meta-ExternalAgent", "Amazonbot", "YouBot",
    "Bingbot", "DuckDuckBot",
  ];

  for (const pattern of knownPatterns) {
    if (ua.includes(pattern)) return pattern;
  }

  return "Unknown Agent";
}
