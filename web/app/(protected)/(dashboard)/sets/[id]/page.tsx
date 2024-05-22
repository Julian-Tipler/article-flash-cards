"use client";
import React, { useEffect, useState } from "react";
import { FlipCard } from "./FlipCard";
import { Title } from "@/app/shared/components/Title";
import EmblaCarousel from "./EmblaCarousel";
import { supabase } from "@/app/shared/clients/supabase/supabase-client";

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
  const [error, setError] = useState<string | null>(null);

  const { id } = params;

  useEffect(() => {
    supabase.functions
      .invoke(`cards?setId=${id}`, { method: "GET" })
      .then((response) => {
        const { data, error } = response;
        if (error) {
          setError(error.message || "An unexpected error occurred");
        }
        setCards(data.cards);
        setSet(data.set);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  if (error) return <div>{error}</div>;
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
        options={{
          duration: 20,
        }}
        setCurrentSlide={setCurrentSlide}
      />
      <div>
        {currentSlide + 1}/{cards.length}
      </div>
    </div>
  );
};

export default Cards;
