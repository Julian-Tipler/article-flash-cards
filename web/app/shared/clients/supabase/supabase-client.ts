import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.provider_token) {
    window.localStorage.setItem("oauth_provider_token", session.provider_token);
  }

  if (session && session.provider_refresh_token) {
    window.localStorage.setItem(
      "oauth_provider_refresh_token",
      session.provider_refresh_token,
    );
  }

  if (event === "SIGNED_OUT") {
    window.localStorage.removeItem("oauth_provider_token");
    window.localStorage.removeItem("oauth_provider_refresh_token");
  }
});
