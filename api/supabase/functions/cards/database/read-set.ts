import { supabase } from "../../_shared/clients/supabase.ts";

export const readSet = async (
  { cardSetId }: {
    cardSetId: string;
  },
) => {
  const { data, error } = await supabase.from("cards").select("*").eq(
    "cardSetId",
    cardSetId,
  );
  const { data: cardSetData, error: cardSetError } = await supabase.from(
    "cardSets",
  ).select("*").eq(
    "id",
    cardSetId,
  ).single();
  if (error) {
    throw error;
  }
  if (cardSetError) {
    throw cardSetError;
  }
  return {
    cards: data,
    cardSet: cardSetData,
  };
};
