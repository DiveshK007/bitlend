import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionItem } from '@/components/shared/TransactionItem';
import { motion } from 'framer-motion';
import { StatisticsChart } from '@/components/shared/StatisticsChart';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Transactions() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['/api/transactions'],
  });

  const transactionsByDate = transactions?.reduce((groups: any, transaction: any) => {
    const date = new Date(transaction.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    if (!groups[date]) {
      groups[date] = [];
    }
    
    groups[date].push(transaction);
    return groups;
  }, {}) || {};

  // Create data for transaction chart
  const chartData = transactions?.reduce((acc: any, transaction: any) => {
    const month = new Date(transaction.createdAt).toLocaleDateString('en-US', { month: 'short' });
    
    if (!acc[month]) {
      acc[month] = { 
        month,
        deposits: 0,
        withdrawals: 0,
        repayments: 0,
        disbursements: 0
      };
    }
    
    switch(transaction.type) {
      case 'deposit':
        acc[month].deposits += transaction.amount;
        break;
      case 'withdrawal':
        acc[month].withdrawals += transaction.amount;
        break;
      case 'repayment':
        acc[month].repayments += transaction.amount;
        break;
      case 'disbursement':
        acc[month].disbursements += transaction.amount;
        break;
    }
    
    return acc;
  }, {});
  
  const chartDataArray = chartData ? Object.values(chartData) : [];

  return (
    <div className="page-container">
      <div className="content-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#ffffff' }}>Transaction History</h1>
        
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle style={{ color: '#ffffff' }}>Transaction Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="loading-spinner"></div>
                  </div>
                ) : chartDataArray.length > 0 ? (
                  <StatisticsChart data={chartDataArray} />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>No transaction data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <motion.div 
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <div className="py-12 text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Loading transaction history...</p>
            </div>
          ) : transactions?.length === 0 ? (
            <div className="empty-state">
              <h3>No transactions yet</h3>
              <p>Your transaction history will appear here once you start lending, borrowing, or making deposits.</p>
            </div>
          ) : (
            Object.entries(transactionsByDate).map(([date, dayTransactions]: [string, any]) => (
              <motion.div key={date} variants={fadeIn} className="mb-6">
                <h2 className="text-lg font-medium mb-3" style={{ color: '#ffffff' }}>{date}</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {dayTransactions.map((transaction: any) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
}
