-- CrawlWatch Database Schema
-- All tables prefixed with crawlwatch_

-- ============================================
-- 1. USERS TABLE (extends existing users table)
-- ============================================
CREATE TABLE IF NOT EXISTS crawlwatch_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'growth', 'enterprise')),
  payment_status TEXT DEFAULT 'free' CHECK (payment_status IN ('free', 'paid', 'canceled')),
  payment_id TEXT,
  payment_amount INTEGER,
  paid_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crawlwatch_users_clerk_id ON crawlwatch_users(clerk_id);

-- ============================================
-- 2. SITES TABLE - websites users are tracking
-- ============================================
CREATE TABLE IF NOT EXISTS crawlwatch_sites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES crawlwatch_users(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  name TEXT,
  verified BOOLEAN DEFAULT FALSE,
  verification_token TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, domain)
);

CREATE INDEX idx_crawlwatch_sites_user_id ON crawlwatch_sites(user_id);
CREATE INDEX idx_crawlwatch_sites_domain ON crawlwatch_sites(domain);

-- ============================================
-- 3. AGENTS TABLE - known AI agents/bots
-- ============================================
CREATE TABLE IF NOT EXISTS crawlwatch_agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  company TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('search', 'training', 'assistant', 'research', 'indexing', 'other')),
  user_agent_pattern TEXT,
  ip_ranges JSONB DEFAULT '[]',
  documentation_url TEXT,
  robots_txt_name TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed with known AI agents
INSERT INTO crawlwatch_agents (name, company, description, category, user_agent_pattern, robots_txt_name) VALUES
  ('GPTBot', 'OpenAI', 'Web crawler for training ChatGPT models', 'training', 'GPTBot', 'GPTBot'),
  ('ChatGPT-User', 'OpenAI', 'Real-time web browsing for ChatGPT users', 'assistant', 'ChatGPT-User', 'ChatGPT-User'),
  ('OAI-SearchBot', 'OpenAI', 'Web search for ChatGPT search feature', 'search', 'OAI-SearchBot', 'OAI-SearchBot'),
  ('ClaudeBot', 'Anthropic', 'Web crawler for training Claude models', 'training', 'ClaudeBot', 'ClaudeBot'),
  ('PerplexityBot', 'Perplexity', 'Web crawler for Perplexity AI search', 'search', 'PerplexityBot', 'PerplexityBot'),
  ('Google-Extended', 'Google', 'Crawler for Gemini and AI training', 'training', 'Google-Extended', 'Google-Extended'),
  ('Googlebot', 'Google', 'Standard Google web crawler', 'indexing', 'Googlebot', 'Googlebot'),
  ('Bytespider', 'ByteDance', 'TikTok/ByteDance web crawler', 'training', 'Bytespider', 'Bytespider'),
  ('CCBot', 'Common Crawl', 'Non-profit web archive crawler', 'research', 'CCBot', 'CCBot'),
  ('Applebot-Extended', 'Apple', 'Apple Intelligence and Siri training', 'training', 'Applebot-Extended', 'Applebot-Extended'),
  ('cohere-ai', 'Cohere', 'Cohere AI model training crawler', 'training', 'cohere-ai', 'cohere-ai'),
  ('Meta-ExternalAgent', 'Meta', 'Meta AI training and features', 'training', 'Meta-ExternalAgent', 'Meta-ExternalAgent'),
  ('Amazonbot', 'Amazon', 'Amazon Alexa and AI features', 'assistant', 'Amazonbot', 'Amazonbot'),
  ('YouBot', 'You.com', 'You.com AI search crawler', 'search', 'YouBot', 'YouBot')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 4. AGENT VISITS TABLE - crawl events
-- ============================================
CREATE TABLE IF NOT EXISTS crawlwatch_agent_visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES crawlwatch_sites(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES crawlwatch_agents(id),
  agent_name TEXT NOT NULL,
  path TEXT NOT NULL,
  method TEXT DEFAULT 'GET',
  status_code INTEGER,
  user_agent TEXT,
  ip_address INET,
  response_time_ms INTEGER,
  content_type TEXT,
  metadata JSONB DEFAULT '{}',
  visited_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crawlwatch_visits_site_id ON crawlwatch_agent_visits(site_id);
CREATE INDEX idx_crawlwatch_visits_agent_id ON crawlwatch_agent_visits(agent_id);
CREATE INDEX idx_crawlwatch_visits_visited_at ON crawlwatch_agent_visits(visited_at DESC);
CREATE INDEX idx_crawlwatch_visits_site_time ON crawlwatch_agent_visits(site_id, visited_at DESC);
CREATE INDEX idx_crawlwatch_visits_agent_name ON crawlwatch_agent_visits(agent_name);

-- ============================================
-- 5. VISIBILITY SCORES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS crawlwatch_visibility_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES crawlwatch_sites(id) ON DELETE CASCADE,
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  platform_scores JSONB DEFAULT '{}',
  -- e.g. {"chatgpt": 75, "perplexity": 82, "claude": 68, "gemini": 71, "copilot": 60}
  prompt_rankings JSONB DEFAULT '[]',
  -- e.g. [{"prompt": "best project management tool", "platform": "chatgpt", "position": 3}]
  calculated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crawlwatch_visibility_site ON crawlwatch_visibility_scores(site_id);
CREATE INDEX idx_crawlwatch_visibility_time ON crawlwatch_visibility_scores(calculated_at DESC);

-- ============================================
-- 6. PAGE SCORES TABLE - content optimization
-- ============================================
CREATE TABLE IF NOT EXISTS crawlwatch_page_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES crawlwatch_sites(id) ON DELETE CASCADE,
  path TEXT NOT NULL,
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  structured_data_score INTEGER CHECK (structured_data_score >= 0 AND structured_data_score <= 100),
  heading_score INTEGER CHECK (heading_score >= 0 AND heading_score <= 100),
  content_clarity_score INTEGER CHECK (content_clarity_score >= 0 AND content_clarity_score <= 100),
  meta_score INTEGER CHECK (meta_score >= 0 AND meta_score <= 100),
  suggestions JSONB DEFAULT '[]',
  -- e.g. [{"type": "warning", "title": "Missing FAQ schema", "description": "...", "priority": "high"}]
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, path)
);

CREATE INDEX idx_crawlwatch_pages_site ON crawlwatch_page_scores(site_id);

-- ============================================
-- 7. CITATIONS TABLE - AI platform citations
-- ============================================
CREATE TABLE IF NOT EXISTS crawlwatch_citations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id UUID REFERENCES crawlwatch_sites(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  prompt TEXT NOT NULL,
  cited_url TEXT,
  cited_text TEXT,
  position INTEGER,
  detected_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_crawlwatch_citations_site ON crawlwatch_citations(site_id);
CREATE INDEX idx_crawlwatch_citations_time ON crawlwatch_citations(detected_at DESC);

-- ============================================
-- 8. ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE crawlwatch_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE crawlwatch_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE crawlwatch_agent_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE crawlwatch_visibility_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE crawlwatch_page_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE crawlwatch_citations ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (used by our API)
CREATE POLICY "Service role full access" ON crawlwatch_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON crawlwatch_sites FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON crawlwatch_agent_visits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON crawlwatch_agents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON crawlwatch_visibility_scores FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON crawlwatch_page_scores FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON crawlwatch_citations FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 9. UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_crawlwatch_users_updated_at
  BEFORE UPDATE ON crawlwatch_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crawlwatch_sites_updated_at
  BEFORE UPDATE ON crawlwatch_sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
