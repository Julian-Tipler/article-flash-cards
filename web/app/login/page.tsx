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
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-blue-200">
      <div className="mb-36 flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg bg-white p-24 shadow-sm transition-shadow">
        <img
          src="/ai-flashcard-logo.png"
          alt="logo"
          className="h-32 w-32"
        />
        <h1 className="text-3xl font-bold text-gray-500">AI Flashcards</h1>
        <div>
          <button
            onClick={signInWithGoogle}
            className="flex h-10 w-52 max-w-md items-center justify-start rounded-md px-3 py-2 text-center text-sm text-black shadow-md transition duration-200 ease-in hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200"
          >
            <img
              className="mr-6 h-5 w-5"
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
