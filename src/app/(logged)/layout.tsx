'use client';
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/Header/Header.jsx'), { ssr: false });
const Sidebar = dynamic(() => import('@/components/Sidebar/SideBar.jsx'), { ssr: false });

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
