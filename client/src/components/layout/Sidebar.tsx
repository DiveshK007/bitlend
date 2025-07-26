import React from 'react';
import { Link, useLocation } from 'wouter';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { cn, formatBTC, shortenWalletAddress } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useUserWallet } from '@/hooks/use-wallet';

interface SidebarItemProps {
  href: string;
  icon: string;
  label: string;
  isActive: boolean;
}

function SidebarItem({ href, icon, label, isActive }: SidebarItemProps) {
  return (
    <li className="mb-3">
      <Link href={href}>
        <div
          className={`sidebar-item ${isActive ? 'active' : ''}`}
        >
          <i className={`ri-${icon}-line mr-4 text-xl group-hover:scale-110 transition-transform duration-300`}></i>
          {label}
        </div>
      </Link>
    </li>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const { user, handleLogout } = useAuth();
  const { wallet } = useUserWallet();

  const navItems = [
    { href: "/dashboard", icon: "dashboard", label: "Dashboard" },
    { href: "/loans", icon: "exchange-dollar", label: "My Loans" },
    { href: "/marketplace", icon: "store-2", label: "Marketplace" },
    { href: "/transactions", icon: "exchange-funds", label: "Transactions" },
    { href: "/wallet", icon: "wallet-3", label: "Wallet" },
    { href: "/settings", icon: "settings-3", label: "Settings" },
  ];

  const initials = user?.avatarInitials || "BT";
  const walletAddress = wallet.isConnected ? wallet.address : user?.walletAddress;
  const btcBalance = wallet.isConnected && wallet.balance 
    ? parseFloat(wallet.balance) 
    : user?.btcBalance || 0;

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-80 p-6 h-screen fixed top-0 left-0 custom-scrollbar overflow-y-auto relative z-20">
      <div className="glass-card p-6 mb-8">
        <div className="flex items-center mb-8">
          <BitcoinIcon className="text-blue-400 text-4xl mr-3" />
          <span className="font-bold text-3xl gradient-text">BitLend</span>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-6">
            <div className="glass rounded-2xl h-14 w-14 flex items-center justify-center mr-4 glow">
              <span className="font-bold text-lg text-white">{initials}</span>
            </div>
            <div>
              <p className="font-semibold text-lg" style={{ color: '#ffffff' }}>{user?.username || "Anonymous"}</p>
              <p className="text-sm text-white/60 truncate">
                {shortenWalletAddress(walletAddress || "")}
              </p>
            </div>
          </div>
          
          <div className="glass p-4 rounded-2xl mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Portfolio Balance</span>
                <span className="font-semibold flex items-center" style={{ color: '#007aff' }}>
                  <BitcoinIcon className="mr-2" size={18} />
                  <span className="text-lg">{formatBTC(btcBalance)}</span>
                </span>
              </div>
              <button className="glass-button w-full text-sm py-3">
                <i className="ri-add-line mr-2"></i> Add Funds
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 glass-card p-6">
        <ul>
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={location === item.href}
            />
          ))}
        </ul>
      </nav>
      
      <div className="mt-6 glass-card p-6">
        <Link href="/help">
          <div className="sidebar-item mb-3">
            <i className="ri-question-line mr-4 text-xl"></i>
            Help & Support
          </div>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center p-4 w-full text-left rounded-2xl font-medium transition-all duration-300 glass hover:bg-red-500/10"
          style={{ color: '#ff453a' }}
        >
          <i className="ri-logout-box-line mr-4 text-xl"></i>
          Log Out
        </button>
      </div>
    </aside>
  );
}