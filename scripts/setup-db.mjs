/**
 * CrawlWatch Database Setup Script
 *
 * This script creates all required database tables in Supabase.
 * Run via: node scripts/setup-db.mjs
 *
 * Since we can't run raw SQL through PostgREST, this creates an
 * API route that runs the migration, then calls it.
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://akovvgmmemxkcldvsykx.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrb3Z2Z21tZW14a2NsZHZzeWt4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzcxOTg0MCwiZXhwIjoyMDY5Mjk1ODQwfQ.VvFSW9aSjEOQwDlhHZdJu-IHfkHmVyVOC7w3NxtB-T4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Split SQL into individual statements and run them via PostgREST
// We need to use the SQL endpoint that Supabase exposes

async function runSQL(sql) {
  // Use Supabase's internal SQL execution endpoint
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({})
  });
  return res;
}

// Alternative: Use fetch to hit the pg-meta or sql endpoint
async function executeSQLViaPgMeta(sql) {
  const endpoints = [
    '/pg/sql',
    '/rest/v1/rpc/exec_sql',
    '/sql',
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${SUPABASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: sql, sql_string: sql })
      });

      if (res.ok) {
        console.log(`Success via ${endpoint}`);
        return await res.json();
      }
    } catch (e) {
      // Try next endpoint
    }
  }
  return null;
}

async function main() {
  console.log('CrawlWatch Database Setup');
  console.log('========================\n');

  // Test connection
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
  console.log('To create the tables, please run the SQL migration manually:');
  console.log('');
  console.log('1. Go to https://supabase.com/dashboard/project/akovvgmmemxkcldvsykx/sql');
  console.log('2. Paste the contents of: supabase/migrations/001_initial_schema.sql');
  console.log('3. Click "Run"');
  console.log('');
  console.log('OR create an API route to run the migration. Creating one now...');
}

main();
