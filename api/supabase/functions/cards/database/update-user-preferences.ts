import { supabase } from "../../_shared/clients/supabase.ts";

export const updateUserPreferences = async (
  { userId, defaultDifficulty, defaultQuantity }: {
    userId: string;
    defaultDifficulty: number;
    defaultQuantity: number;
  },
) => {
  await supabase
    .from("users")
    .update({
      defaultQuantity,
      defaultDifficulty,
    })
    .eq("id", userId);
};
