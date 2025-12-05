// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Per ora Libra è una landing vetrina.
 * Se non ci sono le ENV, non deve crashare niente.
 * Supabase sarà null finché non attivi login/dashboard.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export function isSupabaseEnabled() {
  return Boolean(supabase);
}
