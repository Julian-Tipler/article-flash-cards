"use client";
import { supabase } from "@/app/shared/clients/supabase/supabase-client";
import { Button } from "@/app/shared/components/Button";
import React, { useEffect, useState } from "react";

const Preferences = () => {
  const [difficulty, setDifficulty] = useState(5);
  const [quantity, setQuantity] = useState(5);

  useEffect(() => {
    supabase.functions
      .invoke(`users/preferences`, {
        method: "GET",
      })
      .then((response) => {
        const { data } = response;
        if (data) {
          setDifficulty(data.defaultDifficulty);
          setQuantity(data.defaultQuantity);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value);
    setDifficulty(value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  const handleSubmit = () => {
    supabase.functions
      .invoke(`users/preferences`, {
        method: "POST",
        body: {
          defaultDifficulty: difficulty,
          defaultQuantity: quantity,
        },
      })
      .then((response) => {
        const { data, error } = response;
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="flex flex-col space-y-4 ">
      <div className="flex items-center">
        <label htmlFor="difficulty" className="mr-2 w-16">
          Difficulty:
        </label>
        <div>
          <input
            type="range"
            id="difficulty"
            min={1}
            max={10}
            value={difficulty}
            onChange={handleDifficultyChange}
            className="w-64"
          />
          <span className="ml-2">{difficulty}</span>
        </div>
      </div>
      <div className="flex items-center">
        <label htmlFor="quantity" className="mr-2 w-16">
          Quantity:
        </label>
        <div>
          <input
            type="range"
            id="quantity"
            min={1}
            max={10}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-64"
          />
          <span className="ml-2">{quantity}</span>
        </div>
      </div>
      <Button text={"Update"} onClick={handleSubmit} className="w-24" />
    </div>
  );
};

export default Preferences;
