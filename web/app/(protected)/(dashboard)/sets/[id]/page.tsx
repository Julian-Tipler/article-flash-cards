"use client";
import React, { useEffect, useState } from "react";
import { FlipCard } from "./FlipCard";
import { Title } from "@/app/shared/components/Title";
import EmblaCarousel from "./EmblaCarousel";

export type Card = {
  id: string;
  front: string;
  back: string;
};

const Cards = ({ params }: { params: { id: string } }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [set, setSet] = useState<Record<string, any>>({});
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const { id } = params;

  useEffect(() => {
    fetch(`http://127.0.0.1:55321/functions/v1/cards/?setId=${id}`, {
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
        setSet(data.set);
      })
      .catch((error) => {
        if (error.name === `AbortError`) {
          return { aborted: true };
        }
        console.error("FETCH regular error", error);
        return { error: error.message };
      });
  }, [id]);
  if (!cards.length || !set) return <div>Fetching data</div>;
  const slides = cards.map((card, index) => {
    return (
      <FlipCard
        key={`card-${index}`}
        front={card.front}
        back={card.back}
        currentSlide={currentSlide}
        index={index}
      />
    );
  });
  return (
    <div className="flex flex-col items-center">
      <Title>{set.title}</Title>
      <EmblaCarousel
        slides={slides}
        options={{}}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
};

export default Cards;
