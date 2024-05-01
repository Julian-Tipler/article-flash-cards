"use client";
import { supabase } from "@/app/shared/clients/supabase/supabase-client";
import React from "react";

export const Header = () => {
  const handleLogout = () => {
    supabase.auth.signOut();
  };
  return (
    <header className=" border-border border-0.5  bg-navi flex items-center justify-between border-b p-4">
      <h1 className="text-xl font-bold"> </h1>
      <button
        onClick={handleLogout}
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
};
