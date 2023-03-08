import Head from "next/head";
import { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {

  return (
    <>
      <Head>
        <title>Continuus Blog Application</title>
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main>
        {children}
      </main>
    </>
  );
};

