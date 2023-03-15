import Head from "next/head";
import type { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Continuus Blog Application</title>
      </Head>
      <header className="sticky top-0 w-full h-12 bg-white box-border z-10">
        <Navbar />
      </header>
      <nav className="fixed w-full bg-white top-full z-10 h-24 -translate-y-full md:h-auto md:sticky md:translate-y-0 md:top-12 left-0 md:inline-block md:align-top md:w-1/6">
        <Sidebar />
      </nav>
      <main className="inline-flex w-full md:w-5/6 overflow-x-auto">
        {children}
      </main>
    </>
  );
};
