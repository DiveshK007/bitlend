import React from 'react';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { Sidebar } from './Sidebar';
import { MobileFooter } from './MobileFooter';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <DesktopHeader />
      <MobileHeader />
      <Sidebar />
      
      <main className="lg:pl-80 lg:pt-24 w-full">
        {children}
      </main>
      
      <MobileFooter />
    </div>
  );
}