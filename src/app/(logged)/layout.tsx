'use client'
import React from 'react';
import { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/SideBar";
import Header from "@/components/Header/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
