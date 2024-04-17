"use client";
import React, { useEffect } from "react";

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
  console.log(sets);
  return (
    <div>
      {sets.map((set: any) => (
        <div key={set.id}>
          <div>
            <h1>{set.title}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
