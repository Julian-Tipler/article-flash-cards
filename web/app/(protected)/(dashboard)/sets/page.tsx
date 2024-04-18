"use client";
import React, { useEffect } from "react";
import Link from "next/link";

const Cards = ({ params }: { params: { id: string } }) => {
  const [sets, setSets] = React.useState([]);
  const { id } = params;

  useEffect(() => {
    fetch(`http://127.0.0.1:55321/functions/v1/cards`, {
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
        setSets(data.cards);
      })
      .catch((error) => {
        if (error.name === `AbortError`) {
          return { aborted: true };
        }
        console.error("FETCH regular error", error);
        return { error: error.message };
      });
  }, [id]);

  if (!sets) return <div>Failed to fetch data</div>;
  return (
    <div className="flex flex-col gap-4">
      {sets.map((set: any) => (
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
