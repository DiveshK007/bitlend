import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatBTC } from '@/lib/utils';
import { MetricCard } from '@/components/shared/MetricCard';
import { LoanTable } from '@/components/shared/LoanTable';
import { TransactionItem } from '@/components/shared/TransactionItem';
import { MarketplaceLoanCard } from '@/components/shared/MarketplaceLoanCard';
import { useToast } from '@/hooks/use-toast';
import { Loan } from '@shared/schema';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Query user stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/user/stats'],
  });
  
  // Query active loans
  const { data: activeLoans, isLoading: loansLoading } = useQuery({
    queryKey: ['/api/loans/active'],
  });
  
  // Query recent transactions
  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['/api/transactions'],
  });
  
  // Query marketplace loans
  const { data: marketplaceLoans, isLoading: marketplaceLoading } = useQuery({
    queryKey: ['/api/loans/marketplace'],
  });

  const handleViewLoanDetails = (loan: Loan) => {
    setLocation(`/loans/${loan.id}`);
  };

  const handleAcceptLoan = (loan: Loan) => {
    toast({
      title: 'Coming Soon',
      description: 'This feature is under development',
    });
  };

  const recentTransactions = transactions?.slice(0, 3) || [];
  const highlightedMarketplaceLoans = marketplaceLoans?.slice(0, 4) || [];
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating background orbs */}
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>
      
      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Hero Welcome Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="glass-card p-8 hero-gradient relative overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                  <span className="gradient-text">Welcome to BitLend</span>
                </h1>
                <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                  The future of decentralized Bitcoin lending. Secure, transparent, and powered by blockchain technology.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/marketplace">
                    <button className="glass-button text-lg px-8 py-4">
                      <i className="ri-store-2-line mr-3"></i>
                      Explore Marketplace
                    </button>
                  </Link>
                  <Link href="/wallet">
                    <button className="glass rounded-2xl px-8 py-4 text-lg font-medium text-white/90 hover:text-white transition-all duration-300 hover:bg-white/10">
                      <i className="ri-wallet-3-line mr-3"></i>
                      Connect Wallet
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 relative flex items-center justify-center float-animation">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"></div>
                  <div className="relative glass-card w-48 h-48 lg:w-60 lg:h-60 rounded-full flex items-center justify-center">
                    <i className="ri-bit-coin-line text-6xl lg:text-8xl text-blue-400"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Stats Overview */}
        <motion.div 
          className="mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 lg:mb-0">Portfolio Overview</h2>
            <div className="glass rounded-full px-6 py-3 text-sm">
              <span className="text-blue-400 font-medium flex items-center">
                <i className="ri-time-line mr-2"></i> 
                Last updated: Just now
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={fadeIn}>
              <div className="glass-card p-6 stat-card-hover">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="glass rounded-2xl p-3 mr-4">
                      <i className="ri-arrow-down-line text-2xl text-blue-400"></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-white/70 text-sm">Total Borrowed</h3>
                      <div className="glass rounded-full px-3 py-1 text-xs font-medium text-green-400 mt-2 inline-flex items-center">
                        <i className="ri-arrow-up-line mr-1"></i> 12.3%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-white">
                    {statsLoading ? "..." : formatBTC(stats?.totalBorrowed || 0)}
                  </span>
                  <p className="text-xs text-white/50">vs last month</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="glass-card p-6 stat-card-hover">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="glass rounded-2xl p-3 mr-4">
                      <i className="ri-arrow-up-line text-2xl text-purple-400"></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-white/70 text-sm">Total Lent</h3>
                      <div className="glass rounded-full px-3 py-1 text-xs font-medium text-green-400 mt-2 inline-flex items-center">
                        <i className="ri-arrow-up-line mr-1"></i> 8.7%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-white">
                    {statsLoading ? "..." : formatBTC(stats?.totalLent || 0)}
                  </span>
                  <p className="text-xs text-white/50">vs last month</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="glass-card p-6 stat-card-hover">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="glass rounded-2xl p-3 mr-4">
                      <i className="ri-time-line text-2xl text-green-400"></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-white/70 text-sm">Active Loans</h3>
                      <div className="glass rounded-full px-3 py-1 text-xs font-medium text-green-400 mt-2 inline-flex items-center">
                        <i className="ri-add-line mr-1"></i> 2
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-white">
                    {statsLoading ? "..." : stats?.activeLoans || 0}
                  </span>
                  <p className="text-xs text-white/50">new this week</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <div className="glass-card p-6 stat-card-hover">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="glass rounded-2xl p-3 mr-4">
                      <i className="ri-percent-line text-2xl text-yellow-400"></i>
                    </div>
                    <div>
                      <h3 className="font-medium text-white/70 text-sm">Interest Earned</h3>
                      <div className="glass rounded-full px-3 py-1 text-xs font-medium text-green-400 mt-2 inline-flex items-center">
                        <i className="ri-arrow-up-line mr-1"></i> 5.2%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold text-white">
                    {statsLoading ? "..." : formatBTC(stats?.interestEarned || 0)}
                  </span>
                  <p className="text-xs text-white/50">vs last month</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Active Loans Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-3xl font-bold text-white mb-4 lg:mb-0">Active Loans</h2>
            <Link href="/loans">
              <button className="glass rounded-2xl px-6 py-3 text-blue-400 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 flex items-center">
                View All Loans <i className="ri-arrow-right-line ml-2"></i>
              </button>
            </Link>
          </div>
          
          <div className="glass-card p-8">
            {loansLoading ? (
              <div className="py-16 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-6"></div>
                <p className="text-white/70">Loading your active loans...</p>
              </div>
            ) : activeLoans && activeLoans.length === 0 ? (
              <div className="py-16 text-center">
                <div className="glass rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <i className="ri-inbox-line text-4xl text-white/50"></i>
                </div>
                <h3 className="text-2xl font-medium text-white mb-4">No active loans</h3>
                <p className="text-white/70 mb-8 max-w-md mx-auto">You don't have any active loans at the moment. Explore the marketplace to find opportunities.</p>
                <Link href="/marketplace">
                  <button className="glass-button text-lg px-8 py-4">
                    Browse Marketplace
                  </button>
                </Link>
              </div>
            ) : (
              <LoanTable 
                loans={activeLoans || []} 
                onViewDetails={handleViewLoanDetails} 
              />
            )}
          </div>
        </motion.div>
        
        {/* Recent Activity Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.5
              }
            }
          }}
        >
          {/* Recent Transactions */}
          <motion.div className="lg:col-span-1" variants={fadeIn}>
            <div className="glass-card p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="glass rounded-xl p-2 mr-3">
                    <i className="ri-exchange-funds-line text-xl text-blue-400"></i>
                  </div>
                  <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                </div>
                <Link href="/transactions">
                  <button className="glass rounded-xl px-4 py-2 text-blue-400 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 text-sm flex items-center">
                    View All <i className="ri-arrow-right-line ml-1"></i>
                  </button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {transactionsLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-4"></div>
                    <p className="text-white/70">Loading transactions...</p>
                  </div>
                ) : recentTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="glass rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <i className="ri-file-list-line text-2xl text-white/50"></i>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No transactions yet</h3>
                    <p className="text-sm text-white/50">Your transaction history will appear here</p>
                  </div>
                ) : (
                  recentTransactions.map(transaction => (
                    <div key={transaction.id} className="glass rounded-2xl p-4 hover:bg-white/5 transition-all duration-300">
                      <TransactionItem transaction={transaction} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Marketplace Opportunities */}
          <motion.div className="lg:col-span-2" variants={fadeIn}>
            <div className="glass-card p-6 h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <div className="glass rounded-xl p-2 mr-3">
                    <i className="ri-store-2-line text-xl text-purple-400"></i>
                  </div>
                  <h2 className="text-xl font-bold text-white">Marketplace Opportunities</h2>
                </div>
                <Link href="/marketplace">
                  <button className="glass rounded-xl px-4 py-2 text-purple-400 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 text-sm flex items-center">
                    Browse All <i className="ri-arrow-right-line ml-1"></i>
                  </button>
                </Link>
              </div>
              
              {marketplaceLoading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mb-6"></div>
                  <p className="text-white/70">Loading marketplace opportunities...</p>
                </div>
              ) : highlightedMarketplaceLoans.length === 0 ? (
                <div className="text-center py-20">
                  <div className="glass rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <i className="ri-store-2-line text-4xl text-white/50"></i>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4">No loans available</h3>
                  <p className="text-white/70 mb-8 max-w-sm mx-auto">Check back later for new loan opportunities or visit the marketplace</p>
                  <Link href="/marketplace">
                    <button className="glass-button text-lg px-8 py-4">
                      Visit Marketplace
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {highlightedMarketplaceLoans.map(loan => (
                    <div key={loan.id} className="marketplace-card-hover">
                      <MarketplaceLoanCard 
                        loan={loan}
                        rating={4.5}
                        onAccept={handleAcceptLoan}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}