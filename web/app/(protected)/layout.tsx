"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../shared/clients/supabase/supabase-client";
import { User } from "@supabase/supabase-js";
import LoginPage from "../login/page";
import { redirect, usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      session;
      if (session?.user) {
        setUser(session?.user);
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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    redirect(`/login/?redirectTo=${pathname}`);
  } else {
    return <div>{children}</div>;
  }
};

export default Layout;
