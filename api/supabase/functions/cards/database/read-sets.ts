import { supabase } from "../../_shared/clients/supabase.ts";

export const readSets = async () => {
  const { data, error } = await supabase.from("sets").select("*").order(
    "createdAt",
    { ascending: false },
  );
  if (error) {
    throw error;
  }
  return data;
};
