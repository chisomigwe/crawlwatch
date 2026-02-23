import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// POST /api/setup-db — One-time database setup endpoint
// Call with: curl -X POST https://your-site.vercel.app/api/setup-db -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY"
// Delete this route after running it successfully.

export async function POST(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const results = [];

  // Test: check if tables already exist
  const { data: existing } = await supabaseAdmin
    .from("crawlwatch_users")
    .select("id")
    .limit(1);

  if (existing !== null) {
    return NextResponse.json({
      message: "Tables already exist",
      hint: "If you need to recreate them, run the SQL migration manually in the Supabase dashboard.",
    });
  }

  return NextResponse.json({
    message: "Tables do not exist yet. Please run the SQL migration manually.",
    instructions: [
      "1. Go to your Supabase dashboard → SQL Editor",
      "2. Paste the contents of supabase/migrations/001_initial_schema.sql",
      "3. Click Run",
      "4. The migration creates 7 tables: crawlwatch_users, crawlwatch_sites, crawlwatch_agents, crawlwatch_agent_visits, crawlwatch_visibility_scores, crawlwatch_page_scores, crawlwatch_citations",
      "5. It also seeds 14 known AI agents into crawlwatch_agents",
    ],
    sql_url: "https://supabase.com/dashboard — open your project's SQL Editor",
  });
}
