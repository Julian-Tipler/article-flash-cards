import React from "react";
import { Header } from "./Header";
import { Navigation } from "./Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
