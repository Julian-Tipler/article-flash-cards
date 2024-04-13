import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_FUNCTIONS_URL || "";
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_API_TOKEN || "";
console.log("supabaseUrl", supabaseUrl);
console.log("supabaseAnonKey", supabaseAnonKey);

export const supabaseFunctions = createClient(supabaseUrl, supabaseAnonKey);
