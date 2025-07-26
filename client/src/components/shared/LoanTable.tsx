import React from 'react';
import { Loan } from '@shared/schema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatBTC, getLoanStatusBadgeClass, getLoanTypeClass } from '@/lib/utils';
import { BitcoinIcon } from '@/components/ui/bitcoin-icon';
import { Button } from '@/components/ui/button';

interface LoanTableProps {
  loans: Loan[];
  onViewDetails: (loan: Loan) => void;
}

export function LoanTable({ loans, onViewDetails }: LoanTableProps) {
  if (!loans.length) {
    return (
      <div className="empty-state">
        <h3 className="text-gray-900 font-bold text-xl mb-3">No active loans</h3>
        <p className="text-gray-700 mb-4">Your active loans will appear here once you start lending or borrowing.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="table-header">
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Interest</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id} className="table-row">
              <TableCell className="table-cell">
                <div className="flex items-center">
                  <span className={`text-xs py-1 px-2 rounded-full font-medium ${getLoanTypeClass(loan.type)}`}>
                    <span className="text-white font-semibold">{loan.type === 'request' ? 'Borrowed' : 'Lent'}</span>
                  </span>
                </div>
              </TableCell>
              <TableCell className="table-cell">
                <div className="flex items-center">
                  <BitcoinIcon className="mr-1" style={{ color: '#007aff' }} size={16} />
                  <span className="font-medium text-gray-900">{formatBTC(loan.amount)}</span>
                </div>
              </TableCell>
              <TableCell className="table-cell">
                <span className="font-medium text-gray-900">{loan.interest}%</span>
              </TableCell>
              <TableCell className="table-cell">
                <span className="text-gray-900">{loan.durationMonths} months</span>
              </TableCell>
              <TableCell className="table-cell">
                <span className={`text-xs py-1 px-2 rounded-full font-medium ${getLoanStatusBadgeClass(loan.status)}`}>
                  {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="table-cell">
                <Button 
                  className="btn-secondary text-white font-semibold"
                  onClick={() => onViewDetails(loan)}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
