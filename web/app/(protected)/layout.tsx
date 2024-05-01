"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../shared/clients/supabase/supabase-client";
import { User } from "@supabase/supabase-js";
import { redirect, usePathname } from "next/navigation";
import { access } from "fs";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const { user } = data;
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && session?.access_token) {
        setUser(session?.user);

        if (chrome.runtime) {
          chrome.runtime.sendMessage(
            process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID,
            {
              action: "saveWiseFlashcardsSessionToken",
              token: session.access_token,
            },
          );
        }
      } else {
        setUser(null);
        chrome.runtime.sendMessage(
          process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID,
          {
            action: "removeWiseFlashcardsSessionToken",
          },
        );
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const pathname = usePathname();

  if (loading) {
    return (
      <div className=" bg-navi flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }
  if (!user) {
    redirect(`/login/?redirectTo=${encodeURIComponent(pathname)}`);
  } else {
    return <div>{children}</div>;
  }
};

export default Layout;
