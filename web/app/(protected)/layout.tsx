"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../shared/clients/supabase/supabase-client";
import { User } from "@supabase/supabase-js";
import { redirect, usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  console.log("PROTECTED LAYOUT");
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const pathname = usePathname();
  console.log("USER", user);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    redirect(`/login/?redirectTo=${encodeURIComponent(pathname)}`);
  } else {
    return <div>{children}</div>;
  }
};

export default Layout;
