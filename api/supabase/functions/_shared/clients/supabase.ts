import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
// import type { Database } from "../../types/supabase.ts";

// export const supabase = createClient<Database>
export const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("ANON_KEY") ?? "",
);
