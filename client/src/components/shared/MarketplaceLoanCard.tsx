import React from 'react';
import { Loan } from '@shared/schema';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { formatBTC, getLoanTypeClass } from '@/lib/utils';

interface MarketplaceLoanCardProps {
  loan: Loan;
  rating?: number;
  onAccept: (loan: Loan) => void;
}

export function MarketplaceLoanCard({ 
  loan, 
  rating = 4.5,
  onAccept 
}: MarketplaceLoanCardProps) {
  const typeClass = getLoanTypeClass(loan.type);
  const isRequest = loan.type === 'request';
  
  const handleAccept = () => {
    onAccept(loan);
  };

  return (
    <div className="loan-card marketplace-card-hover">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`text-xs py-2 px-3 rounded-full font-medium ${typeClass} glass`}>
            {isRequest ? 'Loan Request' : 'Loan Offer'}
          </span>
          <h3 className="font-bold mt-3 flex items-center text-xl text-gray-900">
            <BitcoinIcon className="mr-2" style={{ color: '#007aff' }} size={20} />
            <span>{formatBTC(loan.amount)}</span>
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Interest Rate</p>
          <p className={`font-bold text-lg`} style={{ color: isRequest ? '#007aff' : '#d7aaff' }}>{loan.interest}%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm mb-6 text-gray-600">
        <div>
          <p className="mb-1">Duration</p>
          <p className="font-medium text-gray-900">{loan.durationMonths}mo</p>
        </div>
        <div>
          <p className="mb-1">{isRequest ? 'Borrower' : 'Lender'} Rating</p>
          <p className="font-medium flex items-center text-gray-900">
            <i className="ri-star-fill mr-1" style={{ color: '#fbbf24' }}></i>
            <span>{rating}</span>
          </p>
        </div>
        <div>
          <p className="mb-1">Collateral</p>
          <p className="font-medium text-gray-900">{loan.hasCollateral ? 'Yes' : 'No'}</p>
        </div>
      </div>
      
      <button 
        className={`w-full py-3 font-medium transition-all duration-300 ${
          isRequest 
            ? 'glass-button' 
            : 'btn-secondary'
        }`}
        style={!isRequest ? { color: '#d7aaff' } : {}}
        onClick={handleAccept}
      >
        {isRequest ? 'Fund This Loan' : 'Accept Offer'}
      </button>
    </div>
  );
}