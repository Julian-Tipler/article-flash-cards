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

export type Set = {
  id: string;
  title: string;
};

const Cards = ({ params }: { params: { id: string } }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [set, setSet] = useState<Set | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const { id } = params;

  useEffect(() => {
    fetch(
      process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL + `/cards/?setId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      }
    )
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
        console.error(error);
        return { error: error.message };
      });
  }, [id]);
  if (!cards.length || !set) return <div>Fetching cards...</div>;
  const slides = cards.map((card, index) => {
    return (
      <FlipCard
        key={`card-${index}`}
        front={card.front}
        back={card.back}
        flippable={index === currentSlide}
      />
    );
  });
  return (
    <div className="flex flex-col items-center">
      <Title text={set.title} />
      <EmblaCarousel
        slides={slides}
        options={{}}
        setCurrentSlide={setCurrentSlide}
      />
    </div>
  );
};

export default Cards;
