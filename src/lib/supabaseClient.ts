import { createClient } from "@supabase/supabase-js";

// ✅ Vite uses import.meta.env (not process.env)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://kjzkzzwrzfbahvlebaxu.supabase.co";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqemt6endyemZiYWh2bGViYXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTA3MjAsImV4cCI6MjA3ODE4NjcyMH0.3TCP0ZBOhfdKQ3qvytsKhaT9bhpr4ONpzbr4YkkyMc0";

// 🔍 Debug log (remove this after testing)
console.log("✅ Supabase URL:", SUPABASE_URL);
console.log("✅ Supabase Key loaded:", !!SUPABASE_ANON_KEY);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Missing Supabase environment variables");
}

// ✅ Create the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});