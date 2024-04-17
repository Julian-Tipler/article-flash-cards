"use client";
import React, { useEffect } from "react";
import { FlipCard } from "./FlipCard";

const Cards = ({ params }: { params: { id: string } }) => {
  const [cards, setCards] = React.useState([]);
  const [cardSet, setCardSet] = React.useState({});
  const { id } = params;
  useEffect(() => {
    fetch(`http://127.0.0.1:55321/functions/v1/cards/?cardSetId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCards(data.cards);
        setCardSet(data.cardSet);
      })
      .catch((error) => {
        if (error.name === `AbortError`) {
          return { aborted: true };
        }
        console.error("FETCH regular error", error);
        return { error: error.message };
      });
  }, [id]);

  if (!cards) return <div>Failed to fetch data</div>;
  return (
    <div>
      <div>{cardSet.title}</div>
      {cards.map((card: any) => (
        <FlipCard
          key={card.id}
          id={card.id}
          front={card.front}
          back={card.back}
        />
      ))}
    </div>
  );
};

export default Cards;
