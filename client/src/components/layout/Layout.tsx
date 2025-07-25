import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';
import { DesktopHeader } from './DesktopHeader';
import { MobileFooter } from './MobileFooter';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [location, setLocation] = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background orbs */}
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        
        <div className="relative z-10 text-center">
          <div className="glass-card p-8 rounded-3xl">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Loading BitLend</h2>
            <p className="text-white/70">Preparing your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative overflow-hidden">
      {/* Background orbs */}
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      
      <MobileHeader />
      <Sidebar />
      
      <main className="flex-1 pb-20 lg:pb-0 relative z-10">
        <DesktopHeader />
        {children}
      </main>
      
      <MobileFooter />
    </div>
  );
}