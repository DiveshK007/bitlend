import React from 'react';
import { Skeleton } from './SkeletonLoader';

export function DashboardLoading() {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Hero Section Skeleton */}
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <Skeleton width={400} height={48} className="mb-4" />
              <Skeleton variant="text" lines={2} width={500} />
              <div className="mt-8 flex gap-4">
                <Skeleton width={220} height={60} />
                <Skeleton width={220} height={60} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton variant="circular" width={48} height={48} />
                <Skeleton width={60} height={20} />
              </div>
              <Skeleton width={80} height={16} className="mb-2" />
              <Skeleton width={120} height={32} className="mb-2" />
              <Skeleton width={100} height={14} />
            </div>
          ))}
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <Skeleton width={150} height={24} />
                <Skeleton width={80} height={32} />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton variant="circular" width={40} height={40} className="mr-3" />
                    <div className="flex-1">
                      <Skeleton width="80%" height={16} className="mb-1" />
                      <Skeleton width="60%" height={14} />
                    </div>
                    <Skeleton width={80} height={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <Skeleton width={200} height={24} />
                <Skeleton width={100} height={32} />
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="glass-card p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Skeleton width={80} height={20} className="mb-2" />
                        <Skeleton width={120} height={28} />
                      </div>
                      <Skeleton width={60} height={24} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {Array.from({ length: 3 }, (_, j) => (
                        <div key={j}>
                          <Skeleton width="100%" height={14} className="mb-1" />
                          <Skeleton width="80%" height={16} />
                        </div>
                      ))}
                    </div>
                    <Skeleton width="100%" height={40} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FormLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton width={100} height={16} />
        <Skeleton width="100%" height={56} />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton width={120} height={16} />
          <Skeleton width="100%" height={56} />
        </div>
        <div className="space-y-2">
          <Skeleton width={100} height={16} />
          <Skeleton width="100%" height={56} />
        </div>
      </div>
      
      <Skeleton width="100%" height={80} />
      
      <div className="flex gap-3 justify-end">
        <Skeleton width={100} height={48} />
        <Skeleton width={150} height={48} />
      </div>
    </div>
  );
}