"use client";
import React, { useState } from "react";

export const Card = ({
  id,
  front,
  back,
}: {
  id: string;
  front: string;
  back: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective">
      <div
        className={`relative w-96 h-64 m-4 p-4 cursor-pointer transform ${
          isFlipped ? "rotate-y-180" : ""
        } transition-transform duration-700`}
        onClick={flipCard}
      >
        <div className="absolute w-full h-full rounded-lg shadow-lg bg-white">
          <div
            className={`absolute w-full h-full ${
              isFlipped ? "hidden" : "flex"
            } items-center justify-center`}
          >
            {front}
          </div>
          <div
            className={`absolute w-full h-full ${
              isFlipped ? "flex" : "hidden"
            } rotate-y-180 items-center justify-center`}
          >
            {back}
          </div>
        </div>
      </div>
    </div>
  );
};
