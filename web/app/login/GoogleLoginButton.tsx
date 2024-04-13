"use client";
import React from "react";
import { supabase } from "../clients/supabase";

export const GoogleLoginButton = () => {
  return (
    <button className="w-32 text-white md:w-36" onClick={loginWithGoogle}>
      Login With Google
    </button>
  );
};

const loginWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000",
    },
  });
};
