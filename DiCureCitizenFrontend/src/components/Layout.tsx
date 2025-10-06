
import type { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ background: "linear-gradient(90deg, #a07976 0%, #e1d6ca 100%)" }}>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
