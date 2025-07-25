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
    <div className="glass-card p-6 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 marketplace-card-hover">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`text-xs py-2 px-3 rounded-full font-medium ${typeClass} glass`}>
            {isRequest ? 'Loan Request' : 'Loan Offer'}
          </span>
          <h3 className="font-bold mt-3 flex items-center text-white text-xl">
            <BitcoinIcon className="text-blue-400 mr-2" size={20} />
            <span>{formatBTC(loan.amount)}</span>
          </h3>
        </div>
        <div className="text-right">
          <p className="text-white/60 text-sm">Interest Rate</p>
          <p className={`font-bold text-lg ${isRequest ? 'text-blue-400' : 'text-purple-400'}`}>{loan.interest}%</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm text-white/70 mb-6">
        <div>
          <p className="mb-1">Duration</p>
          <p className="font-medium text-white">{loan.durationMonths}mo</p>
        </div>
        <div>
          <p className="mb-1">{isRequest ? 'Borrower' : 'Lender'} Rating</p>
          <p className="font-medium text-white flex items-center">
            <i className="ri-star-fill text-yellow-400 mr-1"></i>
            <span>{rating}</span>
          </p>
        </div>
        <div>
          <p className="mb-1">Collateral</p>
          <p className="font-medium text-white">{loan.hasCollateral ? 'Yes' : 'No'}</p>
        </div>
      </div>
      
      <button 
        className={`w-full py-3 rounded-2xl font-medium transition-all duration-300 ${
          isRequest 
            ? 'glass-button' 
            : 'glass text-purple-400 hover:text-white hover:bg-purple-500/20'
        }`}
        onClick={handleAccept}
      >
        {isRequest ? 'Fund This Loan' : 'Accept Offer'}
      </button>
    </div>
  );
}