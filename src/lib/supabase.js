import { createClient } from "@supabase/supabase-js";

// Public client (for client-side operations)
export const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  : null;

// Admin client (for server-side operations with full access)
export const supabaseAdmin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : null;

// ============================================
// USER MANAGEMENT
// ============================================

export async function syncUserToSupabase(clerkId, email) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_users")
    .upsert(
      { clerk_id: clerkId, email, updated_at: new Date().toISOString() },
      { onConflict: "clerk_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("Error syncing user:", error);
    throw error;
  }
  return data;
}

export async function getUserByClerkId(clerkId) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_users")
    .select("*")
    .eq("clerk_id", clerkId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error getting user:", error);
  }
  return data;
}

export async function checkUserPaymentStatus(clerkId) {
  if (!supabaseAdmin) return { isPro: false, tier: "free" };
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_users")
    .select("payment_status, plan, payment_id")
    .eq("clerk_id", clerkId)
    .single();

  if (error) return { isPro: false, tier: "free" };

  return {
    isPro: data?.payment_status === "paid",
    tier: data?.plan || "free",
    paymentId: data?.payment_id,
  };
}

export async function updateUserPaymentStatus(clerkId, paymentId, amount) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_users")
    .update({
      payment_status: "paid",
      plan: "growth",
      payment_id: paymentId,
      payment_amount: amount,
      paid_at: new Date().toISOString(),
    })
    .eq("clerk_id", clerkId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// SITE MANAGEMENT
// ============================================

export async function createSite(userId, domain, name) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_sites")
    .upsert(
      {
        user_id: userId,
        domain,
        name: name || domain,
        verification_token: crypto.randomUUID(),
      },
      { onConflict: "user_id,domain" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserSites(clerkId) {
  if (!supabaseAdmin) return [];
  const user = await getUserByClerkId(clerkId);
  if (!user) return [];

  const { data, error } = await supabaseAdmin
    .from("crawlwatch_sites")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data || [];
}

export async function getSiteByDomain(domain) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_sites")
    .select("*")
    .eq("domain", domain)
    .single();

  if (error) return null;
  return data;
}

// ============================================
// AGENT VISIT TRACKING
// ============================================

export async function recordAgentVisit(visitData) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_agent_visits")
    .insert(visitData)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAgentVisits(siteId, { hours = 24, limit = 100 } = {}) {
  if (!supabaseAdmin) return [];
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabaseAdmin
    .from("crawlwatch_agent_visits")
    .select("*")
    .eq("site_id", siteId)
    .gte("visited_at", since)
    .order("visited_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data || [];
}

export async function getAgentVisitStats(siteId, hours = 24) {
  if (!supabaseAdmin) return { total: 0, agents: [], topPages: [] };
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

  const { data: visits, error } = await supabaseAdmin
    .from("crawlwatch_agent_visits")
    .select("agent_name, path, visited_at")
    .eq("site_id", siteId)
    .gte("visited_at", since)
    .order("visited_at", { ascending: false });

  if (error || !visits) return { total: 0, agents: [], topPages: [] };

  const agentMap = {};
  const pageMap = {};

  for (const visit of visits) {
    if (!agentMap[visit.agent_name]) {
      agentMap[visit.agent_name] = { name: visit.agent_name, visits: 0, pages: new Set(), lastSeen: visit.visited_at };
    }
    agentMap[visit.agent_name].visits++;
    agentMap[visit.agent_name].pages.add(visit.path);

    if (!pageMap[visit.path]) {
      pageMap[visit.path] = { path: visit.path, visits: 0, agents: new Set() };
    }
    pageMap[visit.path].visits++;
    pageMap[visit.path].agents.add(visit.agent_name);
  }

  const agents = Object.values(agentMap)
    .map((a) => ({ ...a, pages: a.pages.size }))
    .sort((a, b) => b.visits - a.visits);

  const topPages = Object.values(pageMap)
    .map((p) => ({ ...p, agents: p.agents.size }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 10);

  return { total: visits.length, agents, topPages };
}

// ============================================
// AGENTS DIRECTORY
// ============================================

export async function getAllAgents() {
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_agents")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) return [];
  return data || [];
}

export async function getAgentByUserAgent(userAgentString) {
  if (!supabaseAdmin) return null;
  const { data: agents } = await supabaseAdmin
    .from("crawlwatch_agents")
    .select("*")
    .eq("is_active", true);

  if (!agents) return null;

  for (const agent of agents) {
    if (agent.user_agent_pattern && userAgentString.includes(agent.user_agent_pattern)) {
      return agent;
    }
  }
  return null;
}

// ============================================
// VISIBILITY SCORES
// ============================================

export async function saveVisibilityScore(siteId, scoreData) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_visibility_scores")
    .insert({ site_id: siteId, ...scoreData })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getLatestVisibilityScore(siteId) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_visibility_scores")
    .select("*")
    .eq("site_id", siteId)
    .order("calculated_at", { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

export async function getVisibilityHistory(siteId, days = 30) {
  if (!supabaseAdmin) return [];
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabaseAdmin
    .from("crawlwatch_visibility_scores")
    .select("overall_score, platform_scores, calculated_at")
    .eq("site_id", siteId)
    .gte("calculated_at", since)
    .order("calculated_at", { ascending: true });

  if (error) return [];
  return data || [];
}

// ============================================
// PAGE SCORES / OPTIMIZATION
// ============================================

export async function savePageScore(siteId, pageData) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_page_scores")
    .upsert(
      { site_id: siteId, ...pageData, scanned_at: new Date().toISOString() },
      { onConflict: "site_id,path" }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPageScores(siteId) {
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_page_scores")
    .select("*")
    .eq("site_id", siteId)
    .order("overall_score", { ascending: true });

  if (error) return [];
  return data || [];
}

// ============================================
// CITATIONS
// ============================================

export async function saveCitation(siteId, citationData) {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("crawlwatch_citations")
    .insert({ site_id: siteId, ...citationData })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getCitations(siteId, { days = 7, limit = 50 } = {}) {
  if (!supabaseAdmin) return [];
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabaseAdmin
    .from("crawlwatch_citations")
    .select("*")
    .eq("site_id", siteId)
    .gte("detected_at", since)
    .order("detected_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data || [];
}

export async function getCitationCount(siteId, days = 7) {
  if (!supabaseAdmin) return 0;
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const { count, error } = await supabaseAdmin
    .from("crawlwatch_citations")
    .select("*", { count: "exact", head: true })
    .eq("site_id", siteId)
    .gte("detected_at", since);

  if (error) return 0;
  return count || 0;
}
