"use client";
import { usePathname } from "next/navigation";
import { supabase } from "../shared/clients/supabase/supabase-client";

export default function LoginPage() {
  console.log("LOGIN PAGE");
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
