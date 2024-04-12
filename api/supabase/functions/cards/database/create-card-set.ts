import { supabase } from "../../_shared/clients/supabase.ts";

export const createCardSet = async (
  { userId }: { userId: string },
) => {
  // return cardSetId
  const { data, error } = await supabase.from("cardSets").insert({
    userId: userId,
    title: "Untitled",
  }).select("id");

  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error("Failed to create card set");
  }
  return { cardSetId: data[0].id };
};
