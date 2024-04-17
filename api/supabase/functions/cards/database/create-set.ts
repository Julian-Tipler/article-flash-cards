import { supabase } from "../../_shared/clients/supabase.ts";

export const createSet = async (
  { userId, title }: { userId: string; title: string },
) => {
  const { data, error } = await supabase.from("sets").insert({
    userId: userId,
    title: title,
  }).select("id");

  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error("Failed to create card set");
  }
  return { setId: data[0].id };
};
