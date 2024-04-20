"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../shared/clients/supabase/supabase-client";
import { User } from "@supabase/supabase-js";
import { redirect, usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const { user } = data;
      console.log(data);
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);

      if (session?.access_token && chrome.runtime) {
        chrome.runtime.sendMessage(
          process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID,
          {
            action: "saveWiseFlashcardsSessionToken",
            token: session.access_token,
          }
        );
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const pathname = usePathname();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    redirect(`/login/?redirectTo=${encodeURIComponent(pathname)}`);
  } else {
    return <div>{children}</div>;
  }
};

async function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const auth = await supabase.auth.getSession();
  // something like this: const session = supabase.auth.session();
  if (!auth?.data?.session) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  } else {
    console.log("chrome", chrome);
    chrome.runtime.sendMessage(
      process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID,
      {
        action: "saveWiseFlashcardsSessionToken",
        token: auth.data.session,
      },
      (response) => {
        if (response?.success) {
          return redirect("/");
        } else {
          console.error("Error saving token", response.error);
          return redirect("/login");
        }
      }
    );
  }
  return { auth };
}

export default Layout;
