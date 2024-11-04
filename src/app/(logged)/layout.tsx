'use client';
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {/* removendo temporariamente o header e sidebar pra test de deploy */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
