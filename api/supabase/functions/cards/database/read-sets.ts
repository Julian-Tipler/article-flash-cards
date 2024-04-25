import { supabase } from "../../_shared/clients/supabase.ts";

export const readSets = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase.from("sets").select("*").eq(
    "userId",
    userId,
  ).order(
    "createdAt",
    { ascending: false },
  );
  if (error) {
    throw error;
  }
  return data;
};
