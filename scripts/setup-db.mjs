/**
 * CrawlWatch Database Setup Script
 *
 * Run via: node scripts/setup-db.mjs
 *
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load env vars from .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env.local');
const envContent = readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const [key, ...val] = line.split('=');
  if (key && val.length) env[key.trim()] = val.join('=').trim();
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function main() {
  console.log('CrawlWatch Database Setup');
  console.log('========================\n');

  const { data, error } = await supabase.from('crawlwatch_users').select('*').limit(1);

  if (data) {
    console.log('crawlwatch_users table already exists!');
    console.log('Tables may already be set up.');
    return;
  }

  if (error && error.code === 'PGRST116') {
    console.log('Tables already exist (empty result)');
    return;
  }

  console.log('Tables do not exist yet. Code:', error?.code);
  console.log('');
  console.log('To create the tables, run the SQL migration manually:');
  console.log('');
  console.log('1. Go to your Supabase dashboard → SQL Editor');
  console.log('2. Paste the contents of: supabase/migrations/001_initial_schema.sql');
  console.log('3. Click "Run"');
}

main();
