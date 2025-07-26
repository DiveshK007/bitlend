import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const getVariantClass = () => {
    switch (variant) {
      case 'text':
        return 'h-4 rounded';
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-lg';
      default:
        return 'rounded-lg';
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(
              'skeleton',
              getVariantClass(),
              i === lines - 1 && 'w-3/4', // Last line shorter
              className
            )}
            style={{ width, height }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'skeleton',
        getVariantClass(),
        className
      )}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton width={80} height={20} />
          <Skeleton width={120} height={32} />
        </div>
        <Skeleton variant="circular" width={40} height={40} />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <Skeleton width={60} height={16} />
          <Skeleton width={40} height={20} />
        </div>
        <div className="space-y-1">
          <Skeleton width={50} height={16} />
          <Skeleton width={35} height={20} />
        </div>
        <div className="space-y-1">
          <Skeleton width={70} height={16} />
          <Skeleton width={30} height={20} />
        </div>
      </div>
      
      <Skeleton width="100%" height={40} />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="table-container">
      <div className="table-header">
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} width="80%" height={16} />
          ))}
        </div>
      </div>
      
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="table-row">
          <div className="grid grid-cols-6 gap-4">
            {Array.from({ length: 6 }, (_, j) => (
              <Skeleton key={j} width="60%" height={20} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}