"use client";
import { createClient } from "../shared/clients/supabase/supabase-server";
import { redirect, usePathname } from "next/navigation";
import { headers } from "next/headers";
import { supabase } from "../shared/clients/supabase/supabase-client";
import path from "path";

export default function LoginPage() {
  const pathname = usePathname();
  const redirectTo = process.env.NEXT_PUBLIC_URL + pathname;

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
  };
  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
      },
    });
  };

  return (
    <>
      <form
        action={signInWithGoogle}
        className="flex-1 flex justify-center items-center"
      >
        <button>Log in With Google</button>
      </form>
      <form
        action={signInWithGithub}
        className="flex-1 flex justify-center items-center"
      >
        <button>Log in With Github</button>
      </form>
    </>
  );
}
