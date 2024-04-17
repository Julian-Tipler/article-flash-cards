"use client";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { supabase } from "../shared/clients/supabase/supabase-client";

export default function LoginPage() {
  // grab the redirect path from the current URL

  const params = useSearchParams();
  const redirectToParam = params.get("redirectTo");
  console.log("redirectTO", redirectToParam);
  const redirectTo = (process.env.NEXT_PUBLIC_WEB_URL || "") + redirectToParam;
  console.log("redirectTO)))", redirectToParam);

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
