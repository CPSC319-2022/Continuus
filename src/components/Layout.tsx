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
      <nav>
        <Navbar />
      </nav>
      <Sidebar />
      <main className="mt-8">{children}</main>
    </>
  );
};
