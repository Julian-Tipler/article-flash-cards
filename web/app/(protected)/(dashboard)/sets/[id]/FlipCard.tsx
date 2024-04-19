import React, { useEffect, useState } from "react";
import "./FlipCard.css";

export const FlipCard = ({
  front,
  back,
  currentSlide,
  index,
}: {
  front: string;
  back: string;
  currentSlide: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        if (currentSlide === index) {
          console.log(index);
          setIsFlipped((prev) => !prev);
        }
      }
    };

    // Add event listener to the window for handling the keydown event
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFlipped]); // Depend on isFlipped to ensure updated state

  return (
    <div className="perspective">
      <div
        className={`flip-card-container ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <div className="flip-card-inner text-lg">
          <div className="flip-card-front px-6">{front}</div>
          <div className="flip-card-back px-6">{back}</div>
        </div>
      </div>
    </div>
  );
};
