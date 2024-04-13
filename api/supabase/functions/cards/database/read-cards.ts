import { supabase } from "../../_shared/clients/supabase.ts";

export const readCards = async (
  { cardSetId }: {
    cardSetId: string;
  },
) => {
  const { data, error } = await supabase.from("cards").select("*").eq(
    "cardSetId",
    cardSetId,
  );
  if (error) {
    throw error;
  }
  return data;
};
