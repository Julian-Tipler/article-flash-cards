import React from "react";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { createClient } from "../shared/clients/supabase/supabase-server";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex h-screen ">
      <Header />
      <div className="flex flex-1  pt-16">
        <Navigation />
        <main id="outlet-container" className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
