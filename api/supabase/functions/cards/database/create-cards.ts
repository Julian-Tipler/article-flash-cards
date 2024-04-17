import { supabase } from "../../_shared/clients/supabase.ts";

export const createCards = async (
  { cards, setId }: {
    cards: any;
    setId: string;
  },
) => {
  const { data, error } = await supabase.from("cards").insert(
    cards.map((card: any) => ({
      setId,
      ...card,
    })),
  );
  if (error) {
    throw error;
  }
};
