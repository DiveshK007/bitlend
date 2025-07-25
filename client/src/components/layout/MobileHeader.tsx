import React, { useState } from 'react';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { useAuth } from '@/hooks/use-auth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export function MobileHeader() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="md:hidden bg-card shadow-md p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <i className="ri-menu-line text-2xl text-foreground"></i>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 max-w-xs">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="flex items-center">
            <BitcoinIcon className="text-primary text-2xl mr-2" />
            <span className="font-bold text-xl">BitLend</span>
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="relative mr-2">
            <i className="ri-notification-3-line text-2xl text-foreground"></i>
            <span className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center pulse-animation">2</span>
          </Button>
          
          <ThemeToggle />
          
          <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center ml-2">
            <span className="font-semibold">{user?.avatarInitials || "BT"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
