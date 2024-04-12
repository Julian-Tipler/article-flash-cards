import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
// import type { Database } from "../../types/supabase.ts";

export const supabase = createClient<Database>(
  // https://github.com/orgs/supabase/discussions/14169 best practice for connecting to supabase API
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("KEY") ?? "",
);
