
import type { ReactNode } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";


type LayoutProps = {
  children: ReactNode;
};

/* 
@author Team marshmellow
@version 0.0.1
Footer class to provide a general Footer to the entire website. 
*/

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
