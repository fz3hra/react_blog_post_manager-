import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar 
        userName="Umme Faatimah-Iz-Zaahra Mujore"
        userEmail="dev@zaahramujore.com"
      />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;