"use client";
import { useSearchParams } from "next/navigation";
import { supabase } from "../shared/clients/supabase/supabase-client";
import { Suspense } from "react";

export default function LoginPageSuspense() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
}

function LoginPage() {
  // grab the redirect path from the current URL

  const params = useSearchParams();
  const redirectToParam = params.get("redirectTo");
  const redirectTo = (process.env.NEXT_PUBLIC_WEB_URL || "") + redirectToParam;

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
  };
  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
      },
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-blue-200">
      <div className="flex flex-col justify-center items-center gap-2 mb-36 rounded-lg overflow-hidden shadow-sm transition-shadow p-24 bg-white">
        <img src="/icon-lg.png" alt="logo" className="w-32 h-32" />
        <h1 className="text-3xl font-bold text-gray-500">AI Flashcards</h1>
        <div>
          <button
            onClick={signInWithGoogle}
            className="py-2 px-3 max-w-md w-52 flex justify-start items-center hover:bg-gray-100 focus:ring-gray-500 focus:ring-offset-gray-200 text-black transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md text-sm h-10"
          >
            <img
              className="w-5 h-5 mr-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
