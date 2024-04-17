import { supabase } from "../../_shared/clients/supabase.ts";

export const readSets = async () => {
  const { data, error } = await supabase.from("cardSets").select("*");
  if (error) {
    throw error;
  }
  return data;
};
