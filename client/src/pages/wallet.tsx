import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { formatBTC, formatUSD, shortenWalletAddress } from '@/lib/utils';
import { useUserWallet } from '@/hooks/use-wallet';
import { useAuth } from '@/hooks/use-auth';
import { WalletModal } from '@/components/shared/WalletModal';
import { DepositForm } from '@/components/forms/DepositForm';
import { TransactionItem } from '@/components/shared/TransactionItem';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Wallet() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const { wallet, connect, disconnect, isConnecting } = useUserWallet();
  const { user } = useAuth();
  
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['/api/transactions'],
  });

  const recentTransactions = transactions?.slice(0, 5) || [];

  const handleDeposit = () => {
    if (!wallet.isConnected) {
      setIsWalletModalOpen(true);
    } else {
      setIsDepositModalOpen(true);
    }
  };

  // Calculate total balance in USD (mock exchange rate: 1 BTC = $35,000)
  const btcBalance = wallet.isConnected && wallet.balance 
    ? parseFloat(wallet.balance) 
    : user?.btcBalance || 0;
  const usdBalance = btcBalance * 35000;

  return (
    <div className="page-container">
      <div className="content-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#ffffff' }}>My Wallet</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div variants={fadeIn}>
            <Card className="glass-white h-full">
              <CardHeader>
                <CardTitle className="text-gray-900">Wallet Balance</CardTitle>
                <CardDescription>
                  Your available Bitcoin balance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bitcoin-gradient rounded-lg p-6 mb-4" style={{ color: '#ffffff' }}>
                  <div className="flex items-center mb-2">
                    <BitcoinIcon className="mr-2" size={24} />
                    <span className="text-sm">Available Balance</span>
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {formatBTC(btcBalance)}
                  </div>
                  <div className="text-sm opacity-90">
                    {formatUSD(usdBalance)}
                  </div>
                </div>
                
                <div className="my-4">
                  {wallet.isConnected ? (
                    <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50">
                      <div>
                        <div className="text-sm font-medium text-gray-900">Connected Wallet</div>
                        <div className="text-sm text-gray-600">{shortenWalletAddress(wallet.address || '')}</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={disconnect} className="text-gray-700 border-gray-300 hover:bg-gray-50">
                        Disconnect
                      </Button>
                    </div>
                  ) : (
                    <button 
                      className="w-full" 
                      onClick={() => setIsWalletModalOpen(true)}
                      disabled={isConnecting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium"
                    >
                      <i className="ri-wallet-3-line mr-2"></i>
                      {isConnecting ? "Connecting..." : "Connect Wallet"}
                    </button>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleDeposit}>
                    <i className="ri-add-line mr-2"></i> Deposit
                  </Button>
                  <Button className="w-full bg-gray-400 text-white cursor-not-allowed" disabled>
                    <i className="ri-arrow-left-right-line mr-2"></i> Transfer
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <Card className="glass-white h-full">
              <CardHeader>
                <CardTitle className="text-gray-900">Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest wallet activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                {transactionsLoading ? (
                  <div className="py-8 text-center">
                    <div className="loading-spinner mx-auto mb-4"></div>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Loading transactions...</p>
                  </div>
                ) : recentTransactions.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="mb-4 text-gray-600">No transaction history yet</p>
                    <Button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleDeposit}>Make First Deposit</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTransactions.map(transaction => (
                      <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/transactions">View All Transactions</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
      
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
      
      <DepositForm
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
      </div>
    </div>
  );
}

// Quick fix for Link import
import { Link } from 'wouter';