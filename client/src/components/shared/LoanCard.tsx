import React from 'react';
import { Loan } from '@shared/schema';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { formatBTC, getLoanStatusBadgeClass, getLoanTypeClass } from '@/lib/utils';

interface LoanCardProps {
  loan: Loan;
  onViewDetails?: (loan: Loan) => void;
  onRepay?: (loan: Loan) => void;
  showRepayButton?: boolean;
}

export function LoanCard({ 
  loan, 
  onViewDetails, 
  onRepay,
  showRepayButton = false
}: LoanCardProps) {
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(loan);
    }
  };

  const handleRepay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRepay) {
      onRepay(loan);
    }
  };

  const typeClass = getLoanTypeClass(loan.type);
  const statusClass = getLoanStatusBadgeClass(loan.status);
  const isBorrowing = loan.type === 'request';

  return (
    <div className="loan-card glass-white h-full cursor-pointer p-6" onClick={handleViewDetails}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`text-xs py-2 px-3 rounded-full font-medium ${typeClass} glass`}>
            <span className="text-white font-semibold">{isBorrowing ? 'Borrowed' : 'Lent'}</span>
          </span>
          <h3 className="font-bold mt-3 flex items-center text-xl text-gray-900">
            <BitcoinIcon className="mr-2" style={{ color: '#007aff' }} size={20} />
            <span>{formatBTC(loan.amount)}</span>
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Interest Rate</p>
          <p className="font-bold text-lg" style={{ color: '#007aff' }}>{loan.interest}%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm mb-6">
        <div>
          <p className="mb-1 text-gray-600 font-medium">Duration</p>
          <p className="font-medium text-gray-900">{loan.durationMonths} months</p>
        </div>
        <div>
          <p className="mb-1 text-gray-600 font-medium">Status</p>
          <p className={`text-xs py-1 px-2 rounded-full font-medium ${statusClass} glass`}>
            {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
          </p>
        </div>
        <div>
          <p className="mb-1 text-gray-600 font-medium">Collateral</p>
          <p className="font-medium text-gray-900">{loan.hasCollateral ? 'Yes' : 'No'}</p>
        </div>
      </div>
      
      {loan.createdAt && (
        <p className="text-xs mb-4 text-gray-500">
          Created on {new Date(loan.createdAt).toLocaleDateString()}
        </p>
      )}
      
      {(showRepayButton && loan.status === 'active' && isBorrowing) && (
        <button 
          onClick={handleRepay} 
          className="w-full btn-secondary py-3 text-white font-semibold"
        >
          Make Repayment
        </button>
      )}
    </div>
  );
}