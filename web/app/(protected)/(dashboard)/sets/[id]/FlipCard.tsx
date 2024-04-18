import React, { useEffect, useState } from "react";
import "./FlipCard.css";

export const FlipCard = ({ front, back }: { front: string; back: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 32) {
        // keyCode for spacebar
        event.preventDefault(); // Prevent the default action (scroll down)
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
        <div className="flip-card-inner">
          <div className="flip-card-front">{front}</div>
          <div className="flip-card-back">{back}</div>
        </div>
      </div>
    </div>
  );
};
