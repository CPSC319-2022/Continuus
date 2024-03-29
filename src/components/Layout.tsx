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
      <header className="sticky top-0 z-10 box-border h-12 w-full bg-white">
        <Navbar />
      </header>
      <nav className="fixed bottom-0 left-0 z-10 h-24 w-full bg-white md:top-12 md:inline-block md:h-auto md:w-[15%] md:bg-transparent md:align-top">
        <Sidebar />
      </nav>
      <main className="inline-flex w-full overflow-x-auto justify-center mb-24 md:mb-0">
        {children}
      </main>
    </>
  );
};
