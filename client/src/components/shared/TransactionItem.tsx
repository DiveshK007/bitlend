import React from 'react';
import { Transaction } from '@shared/schema';
import { formatBTC, formatUSD, formatDateRelative, getTransactionTypeIcon, getTransactionTypeColor, isPositiveTransaction } from '@/lib/utils';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const transactionIcon = getTransactionTypeIcon(transaction.type);
  const transactionIconColor = getTransactionTypeColor(transaction.type);
  const positive = isPositiveTransaction(transaction.type);

  return (
    <div className="flex items-center">
      <div className={`${transactionIconColor} bg-opacity-10 rounded-full p-2 mr-3`}>
        <i className={`ri-${transactionIcon}-line`}></i>
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{transaction.description}</p>
        <p className="text-xs text-gray-600">{formatDateRelative(transaction.createdAt)}</p>
      </div>
      <div className="text-right">
        <p className={`font-medium flex items-center justify-end`} style={{ color: positive ? '#22c55e' : '#ff453a' }}>
          <i className={`ri-${positive ? 'add' : 'subtract'}-line mr-1 text-xs`}></i>
          <span>{formatBTC(transaction.amount)}</span>
        </p>
        {transaction.usdValue && (
          <p className="text-xs text-gray-600">{formatUSD(transaction.usdValue)}</p>
        )}
      </div>
    </div>
  );
}
