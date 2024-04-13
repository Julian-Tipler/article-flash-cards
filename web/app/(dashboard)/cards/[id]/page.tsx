import React from "react";
import { Card } from "./Card";

async function getData(id: string) {
  const url = process.env.NEXT_PUBLIC_API_URL + "/cards?cardSetId=" + id;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Cards = async ({ params }: { params: { id: string } }) => {
  const { cards } = await getData(params.id);
  console.log("cards", cards);
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
