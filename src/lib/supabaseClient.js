import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when Vite env has both project URL and anon key. */
export function isSupabaseConfigured() {
  return Boolean(url?.trim() && anonKey?.trim());
}

let client;

/**
 * Shared browser client for Auth and database calls.
 * Returns null if env vars are missing (local demo without Supabase).
 */
export function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(url, anonKey);
  }
  return client;
}
