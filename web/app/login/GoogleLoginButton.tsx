"use client";
import React from "react";
import { supabase } from "../shared/clients/supabase/supabase";

export const GoogleLoginButton = () => {
  return (
    <button className="w-32 text-black md:w-36" onClick={loginWithGoogle}>
      Login With Google
    </button>
  );
};

const loginWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};
