import Header from "@/components/Header";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => (
  <div>
      <Header />
      {children}
  </div>
)

export default Layout;