
import type { ReactNode } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
