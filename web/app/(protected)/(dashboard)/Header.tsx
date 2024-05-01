"use client";
import { supabase } from "@/app/shared/clients/supabase/supabase-client";
import React from "react";

export const Header = () => {
  const handleLogout = () => {
    supabase.auth.signOut();
  };
  return (
    <header className=" border-b border-border text-gray-700 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold"> </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
};
