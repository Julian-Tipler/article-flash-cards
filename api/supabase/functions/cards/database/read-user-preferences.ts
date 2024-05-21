import { supabase } from "../../_shared/clients/supabase.ts";

export const readUserPreferences = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("defaultDifficulty", "defaultQuantity")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
