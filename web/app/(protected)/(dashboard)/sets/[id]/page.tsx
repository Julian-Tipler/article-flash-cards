import React from "react";
import { Card } from "./Card";
import { createClient } from "../../../../shared/clients/supabase/supabase-functions";

async function getData(id: string) {
  const supabase = createClient();
  supabase
}

const Cards = async ({ params }: { params: { id: string } }) => {
  const { cards } = await getData(params.id);
  if (!cards) return <div>Failed to fetch data</div>;
  return (
    <div>
      {cards.map((card: any) => (
        <Card key={card.id} id={card.id} front={card.front} back={card.back} />
      ))}
    </div>
  );
};

export default Cards;
