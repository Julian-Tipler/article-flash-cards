"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/app/shared/clients/supabase/supabase-client";

interface CardSet {
  id: string;
  title: string;
}

const Cards = () => {
  const [sets, setSets] = React.useState<CardSet[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    supabase.functions
      .invoke(`cards`, { method: "GET" })
      .then((response) => {
        const { data, error } = response;
        if (error) {
          setError(error.message || "An unexpected error occurred");
        }
        setSets(data.cards);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!sets.length) return <div>loading...</div>;
  return (
    <div className="flex flex-col gap-4">
      {sets.map((set: CardSet) => (
        <Link key={set.id} href={`/sets/${set.id}`} className="truncate">
          <div className="bg-background-white p-4 flex items-center max-w-2xl truncate rounded-lg">
            {set.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
