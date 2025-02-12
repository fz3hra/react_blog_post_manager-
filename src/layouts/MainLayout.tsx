import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar 
      />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;