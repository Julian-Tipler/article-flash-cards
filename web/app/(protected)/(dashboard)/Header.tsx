"use client";
import { supabase } from "@/app/shared/clients/supabase/supabase-client";
import React from "react";

export const Header = () => {
  const handleLogout = () => {
    supabase.auth.signOut();
  };
  return (
    <header className="bg-background-nav border-l border-b border-border text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Test Me</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  );
};
