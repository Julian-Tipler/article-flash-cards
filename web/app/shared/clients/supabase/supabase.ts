import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl: string = process.env.NEXT_PUBLIC_API_URL || "";
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_API_TOKEN || "";

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
