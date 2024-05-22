import { supabase } from "../../_shared/clients/supabase.ts";

export const readUserPreferences = async (userId: string) => {
  const { data, error } = await supabase.from("users").select(
    "defaultDifficulty, defaultQuantity",
  ).eq("id", userId).single();
  console.log(data)

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
