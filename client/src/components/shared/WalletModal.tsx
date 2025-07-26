import React from 'react';
import { useLocation } from 'wouter';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUserWallet } from '@/hooks/use-wallet';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const { connect, isConnecting } = useUserWallet();
  const [, setLocation] = useLocation();

  const handleConnect = async (providerType: string) => {
    try {
      await connect();
      onClose();
      // Redirect to dashboard after successful connection
      setLocation('/dashboard');
    } catch (error) {
      console.error(`Error connecting to ${providerType}:`, error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-card border-0 bg-transparent data-[state=open]:animate-none data-[state=closed]:animate-none shadow-2xl fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold text-center mb-2">Connect Your Wallet</DialogTitle>
          <DialogDescription className="text-white/80 text-center">
            Connect your Bitcoin wallet to start lending and borrowing on BitLend.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-8">
          <Button 
            className="w-full justify-between p-6 text-base font-medium h-auto glass-button border-0 hover:bg-white/20 transition-all duration-300"
            onClick={() => handleConnect('MetaMask')}
            disabled={isConnecting}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-4 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30.0389 1.51562L17.8022 10.4937L20.1267 5.21875L30.0389 1.51562Z" fill="#E2761B" stroke="#E2761B" strokeWidth="0.0625" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.95117 1.51562L14.0629 10.5937L11.8734 5.21875L1.95117 1.51562Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0625" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M25.5891 22.7812L22.4766 27.5L29.1641 29.3125L31.0391 22.9062L25.5891 22.7812Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0625" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M0.970703 22.9062L2.83570 29.3125L9.52320 27.5L6.41070 22.7812L0.970703 22.9062Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0625" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.17969 14.0625L7.20469 16.9375L13.8297 17.25L13.6172 10.0625L9.17969 14.0625Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0625" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22.8203 14.0625L18.3203 9.9375L18.1703 17.25L24.7953 16.9375L22.8203 14.0625Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0625" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.52344 27.5L13.6484 25.4375L10.0859 22.9688L9.52344 27.5Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0625" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.3516 25.4375L22.4766 27.5L21.9141 22.9688L18.3516 25.4375Z" fill="#E4761B" stroke="#E4761B" strokeWidth="0.0625" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-semibold text-white">MetaMask</span>
            </div>
            <i className="ri-arrow-right-line text-white/70"></i>
          </Button>
          
          <Button 
            className="w-full justify-between p-6 text-base font-medium h-auto glass-button border-0 cursor-not-allowed opacity-50"
            disabled={true}
          >
            <div className="flex items-center">
              <i className="ri-wallet-3-line text-white/50 text-2xl mr-4"></i>
              <span className="font-semibold text-white">Bitcoin Core</span>
            </div>
            <i className="ri-arrow-right-line text-white/50"></i>
          </Button>
          
          <Button 
            className="w-full justify-between p-6 text-base font-medium h-auto glass-button border-0 cursor-not-allowed opacity-50"
            disabled={true}
          >
            <div className="flex items-center">
              <i className="ri-safe-2-line text-white/50 text-2xl mr-4"></i>
              <span className="font-semibold text-white">Hardware Wallet</span>
            </div>
            <i className="ri-arrow-right-line text-white/50"></i>
          </Button>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-white/70 mb-3">Don't have a wallet?</p>
          <a 
            href="https://metamask.io/download/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 underline text-sm"
          >
            Learn how to create one
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
