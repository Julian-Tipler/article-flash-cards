"use client";
import React, { useState } from "react";
import "./FlipCard.css";

export const FlipCard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="perspective">
      <div
        className={`flip-card-container ${isFlipped ? "flipped" : ""}`}
        onClick={handleClick}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">{front}</div>
          <div className="flip-card-back">{back}</div>
        </div>
      </div>
    </div>
  );
};
