import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Loan } from '@shared/schema';
import { formatBTC, formatDateRelative, getLoanStatusBadgeClass, calculateRepaymentAmount } from '@/lib/utils';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';

interface LoanDetailsDialogProps {
  loan: Loan;
  isOpen: boolean;
  onClose: () => void;
  onRepay?: () => void;
}

export function LoanDetailsDialog({ loan, isOpen, onClose, onRepay }: LoanDetailsDialogProps) {
  const isBorrowing = loan.type === 'request';
  const statusClass = getLoanStatusBadgeClass(loan.status);
  
  // Calculate loan financials
  const totalRepayment = calculateRepaymentAmount(loan.amount, loan.interest, loan.durationMonths);
  const interestAmount = totalRepayment - loan.amount;
  
  // For demo purposes, assume 50% has been paid if the loan is active
  const paymentProgress = loan.status === 'active' ? 50 : loan.status === 'completed' ? 100 : 0;
  const remainingAmount = totalRepayment * (1 - paymentProgress / 100);
  
  // Calculate monthly payment
  const monthlyPayment = totalRepayment / loan.durationMonths;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] glass-white">
        <DialogHeader>
          <DialogTitle className="text-gray-900 font-bold">Loan Details</DialogTitle>
          <DialogDescription className="text-gray-700">
            View details and status of your {isBorrowing ? "borrowed" : "lent"} loan
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Loan Amount</p>
              <p className="text-2xl font-bold flex items-center">
                <BitcoinIcon className="text-primary mr-1" size={20} />
                {formatBTC(loan.amount)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Status</p>
              <p className={`text-sm py-1 px-3 rounded-full font-medium inline-block ${statusClass}`}>
                {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Interest Rate</p>
              <p className="font-medium text-gray-900">{loan.interest}% APR</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-medium text-gray-900">{loan.durationMonths} months</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Collateral Required</p>
              <p className="font-medium text-gray-900">{loan.hasCollateral ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Created</p>
              <p className="font-medium text-gray-900">{formatDateRelative(loan.createdAt)}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Principal</p>
              <p className="font-medium text-gray-900">{formatBTC(loan.amount)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Interest</p>
              <p className="font-medium text-gray-900">{formatBTC(interestAmount)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-medium text-gray-900">Total Repayment</p>
              <p className="font-medium text-gray-900">{formatBTC(totalRepayment)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Monthly Payment</p>
              <p className="font-medium text-gray-900">{formatBTC(monthlyPayment)}</p>
            </div>
          </div>
          
          {loan.status === 'active' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Repayment Progress</span>
                <span>{paymentProgress}%</span>
              </div>
              <Progress value={paymentProgress} className="h-2" />
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Remaining</span>
                <span className="font-medium text-gray-900">{formatBTC(remainingAmount)}</span>
              </div>
            </div>
          )}
          
          {isBorrowing && loan.status === 'active' && (
            <div className="bg-gray-50 p-3 rounded-md text-sm">
              <p className="font-medium mb-1 text-gray-900">Payment Instructions</p>
              <p className="text-gray-600">
                Please make your monthly payments on time to maintain a good borrower rating
                and avoid any penalties.
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          {isBorrowing && loan.status === 'active' && onRepay && (
            <Button onClick={onRepay} className="bg-blue-600 hover:bg-blue-700 text-white">
              Make Repayment
            </Button>
          )}
          <Button variant="outline" onClick={onClose} className="text-gray-700 border-gray-300 hover:bg-gray-50">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
