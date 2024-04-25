import { supabase } from "../../_shared/clients/supabase.ts";

export const readSet = async (
  { setId, userId }: {
    setId: string;
    userId: string;
  },
) => {
  const [cardsResponse, setResponse] = await Promise.all([
    supabase.from("cards").select("*").eq("setId", setId),
    supabase.from("sets").select("*").eq("id", setId).eq("userId", userId)
      .single(),
  ]);

  const { data: cardsData, error: cardsError } = cardsResponse;
  const { data: setData, error: setError } = setResponse;

  if (cardsError) {
    throw cardsError;
  }

  if (setError) {
    throw setError;
  }

  return {
    cards: cardsData,
    set: setData,
  };
};
