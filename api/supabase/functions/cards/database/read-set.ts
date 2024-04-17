import { supabase } from "../../_shared/clients/supabase.ts";

export const readSet = async (
  { setId }: {
    setId: string;
  },
) => {
  const { data, error } = await supabase.from("cards").select("*").eq(
    "setId",
    setId,
  );
  const { data: setData, error: setError } = await supabase.from(
    "sets",
  ).select("*").eq(
    "id",
    setId,
  ).single();
  if (error) {
    throw error;
  }
  if (setError) {
    throw setError;
  }
  return {
    cards: data,
    set: setData,
  };
};
