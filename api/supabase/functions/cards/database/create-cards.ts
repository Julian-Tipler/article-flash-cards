import { supabase } from "../../_shared/clients/supabase.ts";

export const createCards = async (
  { cards, cardSetId }: {
    cards: any;
    cardSetId: string;
  },
) => {
  const { data, error } = await supabase.from("cards").insert(
    cards.map((card: any) => ({
      cardSetId,
      ...card,
    })),
  );
  console.log(data, error);
  if (error) {
    throw error;
  }
};
